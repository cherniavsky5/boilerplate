const gulp = require('gulp');
const gulpif = require('gulp-if');
const pug = require('gulp-pug');
const bem = require('gulp-pugbem');
const data = require('gulp-data');
const insert = require('gulp-insert');
const fs = require('fs');
const path = require('path');
const plumber = require('gulp-plumber');
const emitty = require('emitty').setup('dev', 'pug');

const methods = {
   'pug:compile': function(done) {
      new Promise((resolve, reject) => {
         // console.log(global.emittyChangedFile)
         emitty.scan(global.emittyChangedFile).then(() => {
            gulp.src('dev/temp/pages/**/*.pug')
               .pipe(plumber())
               .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
               .pipe(data(function() {
                  return JSON.parse(fs.readFileSync('./dev/temp/data.json'));
               }))
               .pipe(pug({
                  pretty: true,
                  plugins: [bem],
                  verbose: true
               }))
               .pipe(gulp.dest('dev'))
               .on('end', resolve)
               .on('error', reject);
         });
      });

      done();
   }
};

module.exports = methods['pug:compile'];
