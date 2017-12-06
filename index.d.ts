import { Transformer } from 'gulp-html-transform';
export interface Options {
    base: string;
    query?: string;
    addStyles?: boolean;
}
export declare const lqip: (options: Options) => Transformer;
