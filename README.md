# gulp-html-lqip
This is a plugin for [gulp-html-transform](https://github.com/maistho/gulp-html-transform)

Adds Low Quality Image Placeholders using [lqip](https://github.com/zouhir/lqip) to your html

## Installing

Using npm
```
$ npm install --save gulp-html-lqip
```

Using yarn
```
$ yarn add gulp-html-lqip
```

## Usage
#### gulpfile.js
```javascript
const path = require('path')
const { transform } = require('gulp-html-transform')
const { lqip } = require('gulp-html-lqip')

gulp.task('html', () => {
  gulp.src('src/**/*.html')
  .pipe(transform(
    lqip({
      base: path.join(__dirname, 'src'),
      addStyles: true,
    })
  ))
  .pipe(gulp.dest('dist'))
})
```

If you want to add the styles manually you can import `index.css` from the package folder and remove `addStyles`.

#### Html in:
```html
<img src="image.jpg">
```

#### Html out:
```html
<div class="lqip" style="padding-top:50%;background-image:url(data:image/jpeg;base64,...">
  <img src="image.jpg" onload="this.parentElement.className='lqip'">
</div>
```

## API
```javascript
lqip({
  // Required:
  base: __dirname + '/src', // usually dirname plus something else, it's relative to where your files are 

  // Optional
  query: 'img[src]', // the query to find images. Might use a class like '.lqip-image'
  addStyles: boolean, // Whether you want to add a style-tag to your head. If not, you will need to import the styles manually. Defaults to false
})
```

