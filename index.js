"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var util_1 = require("util");
var base64 = require('lqip').base64;
var sizeOf = util_1.promisify(require('image-size'));
var readFile = util_1.promisify(fs.readFile);
exports.lqip = function (options) {
    if (!options.base) {
        throw new Error('Missing required parameter `base` from options');
    }
    options = Object.assign({
        query: 'img[src]',
    }, options);
    return function ($) { return __awaiter(_this, void 0, void 0, function () {
        var promises, elements, _loop_1, _i, elements_1, $el;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    if (options.addStyles) {
                        promises.push(readFile(path.join(__dirname, 'index.css'), { encoding: 'utf-8' }).then(function (styles) {
                            $('head').append("<style>" + styles + "</style>");
                        }));
                    }
                    elements = $(options.query).toArray().map(function (el) { return $(el); });
                    _loop_1 = function ($el) {
                        var filepath = path.join(options.base, $el.attr('src'));
                        var p = Promise.all([
                            base64(filepath),
                            sizeOf(filepath),
                        ]).then(function (_a) {
                            var res = _a[0], dimensions = _a[1];
                            var wrapper = $('<div />');
                            wrapper.css('padding-top', ((dimensions.height / dimensions.width) * 100).toFixed(4) + '%');
                            wrapper.css('background-image', "url(" + res + ")");
                            wrapper.attr('class', "lqip blur " + $el.attr('class'));
                            var clone = $el.clone();
                            clone.attr('onload', 'this.parentElement.classList.remove(\'blur\')');
                            clone.attr('class', '');
                            wrapper.append(clone);
                            $el.replaceWith(wrapper);
                        }, function () { });
                        promises.push(p);
                    };
                    for (_i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                        $el = elements_1[_i];
                        _loop_1($el);
                    }
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
};
