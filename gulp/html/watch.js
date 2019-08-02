const gulp = require('gulp');

const server = require('./../server');
const data = require('./data');
const compile = require('./compile');

const methods = {
   'pug:watch': function() {
      gulp.watch('./src/**/*.pug', gulp.series(compile, server.reload));
      gulp.watch('./src/data/**/*.json', gulp.series(data, compile, server.reload))
   }
}

module.exports = methods['pug:watch'];
