const gulp = require('gulp');

const server = require('./../server');
const data = require('./data');
const transform = require('./transform');
const compile = require('./compile');

const methods = {
   'pug:watch': function() {
      global.watch = true;

      gulp.watch('src/**/*.pug', gulp.series(transform)).on('all', (event, filepath) => {
         filepath = filepath.replace(/src/g, 'dev\\temp');
         global.emittyChangedFile = filepath;
      });

      gulp.watch('dev/temp/**/*.pug', gulp.series(compile, server.reload));
      
      gulp.watch('./src/data/**/*.json', gulp.series(data, transform, compile, server.reload));
   }
}

module.exports = methods['pug:watch'];
