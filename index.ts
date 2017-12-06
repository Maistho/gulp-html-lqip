import * as path from 'path'
import * as fs from 'fs'
import { promisify } from 'util'

import { Transformer } from 'gulp-html-transform'
const { base64 }  = require('lqip')

const sizeOf = promisify(require('image-size'))
const readFile = promisify(fs.readFile)

export interface Options {
  base: string
  query?: string
  addStyles?: boolean
}

export const lqip = (options: Options): Transformer => {
  if (!options.base) {
    throw new Error('Missing required parameter `base` from options')
  }

  options = Object.assign({
    query: 'img[src]',
  }, options);

  return async ($: CheerioStatic) => {
    const promises: Promise<void>[] = []

    if (options.addStyles) {
      promises.push(readFile(path.join(__dirname, 'index.css'), { encoding: 'utf-8' }).then(styles => {
        $('head').append(`<style>${styles}</style>`)
      }))
    }


    const elements = $(options.query).toArray().map(el => $(el))

    for (const $el of elements) {
      const filepath = path.join(options.base, $el.attr('src'))

      const p = Promise.all([
        base64(filepath),
        sizeOf(filepath),
      ]).then(([res, dimensions]) => {
        const wrapper = $('<div class="lqip blur" />');
        wrapper.css('padding-top', ((dimensions.height / dimensions.width) * 100).toFixed(4) + '%')
        wrapper.css('background-image', `url(${res})`)
        const clone = $el.clone();
        clone.attr('onload', 'this.parentElement.className=\'lqip\'')
        wrapper.append(clone)
        $el.replaceWith(wrapper)
      }, () => {})
      promises.push(p)
    }

    await Promise.all(promises)
  }
}

