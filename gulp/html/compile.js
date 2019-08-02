const gulp = require('gulp');
const pug = require('gulp-pug');
const bem = require('gulp-pugbem');
const data = require('gulp-data');
const insert = require('gulp-insert');
const fs = require('fs');
const path = require('path');

const methods = {
   'pug:compile': function() {
      return gulp
            .src('./src/pages/**/*.pug')
            .pipe(data(function() {
               return JSON.parse(fs.readFileSync('./dev/temp/data.json'))
            }))
            .pipe(insert.transform(function(contents, file) {
               let regExp = /^include [component|module]+[:]{1}[\w]+$/gim;

               return contents.replace(regExp, function(match) {
                  let componentName = match.split(':')[1];
                  let folder = match.indexOf('component') > -1 ? './components/' : './modules/';
                  let pathToComponent = path.relative(file.relative, folder);
            
                  return match.replace(match, `include ${pathToComponent}${path.sep}${componentName}${path.sep}template`);
               });
            }))
            .pipe(pug({
               basedir: './dev',
               pretty: true,
               plugins: [bem]
            }))
            .pipe(insert.transform(function(contents, file) {
               let pathToAssets = path.relative(path.dirname(file.relative), './assets/').replace(/\\/g, '/');

               return contents.replace('assets', pathToAssets);
            }))
            .pipe(gulp.dest('./dev'));
   }
};

module.exports = methods['pug:compile'];
