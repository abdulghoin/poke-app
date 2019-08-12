const {watch, src, dest} = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

const tailwind = () =>
  src('./src/**/*.tailwind.css')
    .pipe(
      postcss([
        require('tailwindcss')('./tailwind.config.js'),
        require('autoprefixer'),
      ]),
    )
    .pipe(
      rename(path => {
        path.basename = path.basename.replace('.tailwind', '');
      }),
    )
    .pipe(dest('./src/'));

exports.watchTailwind = () =>
  watch(
    './src/**/*.tailwind.css',
    {events: 'all', ignoreInitial: false, queue: false},
    tailwind,
  );

exports.buildTailwind = tailwind;
