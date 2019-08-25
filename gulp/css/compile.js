const gulp = require('gulp');
const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
const shortcss = require('postcss-short');
const cssimport = require('postcss-easy-import');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssNested = require('postcss-nested');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');

const methods = {
   'css:compile': function() {
      var plugins = [
         shortcss,
         cssnext,
         cssimport,
         postcssCustomProperties,
         postcssNested
      ];

      return gulp.src([
         // 'src/assets/css/variables.css',
         'src/assets/css/fonts.css',
         'src/assets/css/base.css',
         'src/assets/css/plugins.css',
         'src/components/**/*.css',
         'src/modules/**/*.css',
         'src/modals/**/*.css',
         'src/assets/css/styles.css'
      ])
         .pipe(plumber())
         .pipe(sourcemaps.init())
         .pipe(postcss(plugins))
         .pipe(sourcemaps.write())
         .pipe(concat('main.css'))
         .pipe(gulp.dest('dev/assets/css'));
   }
};

module.exports = methods['css:compile'];
