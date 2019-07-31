const gulp = require('gulp');
const htmlbeautify = require('gulp-html-beautify');

function compile() {
   return gulp
         .src('./dev/**/*.html')
         .pipe(htmlbeautify())
         .pipe(gulp.dest('./dev'));
};

module.exports = compile;
