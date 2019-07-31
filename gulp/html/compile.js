const gulp = require('gulp');
const pug = require('gulp-pug');
const data = require('gulp-data');
const fs = require('fs');

const methods = {
   'pug:compile': function() {
      return gulp
            .src('./src/pages/**/*.pug')
            .pipe(data(function() {
               return JSON.parse(fs.readFileSync('./dev/temp/data.json'))
            }))
            .pipe(pug({
               basedir: './dev'
            }))
            .pipe(gulp.dest('./dev'));
   }
};

module.exports = methods['pug:compile'];
