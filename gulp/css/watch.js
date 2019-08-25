const gulp = require('gulp');

const server = require('./../server');
const compile = require('./compile');

const methods = {
   'css:watch': function(done) {
      gulp.watch('./src/**/*.css', gulp.series(compile, server.reload));

      done();
   }
}

module.exports = methods['css:watch'];
