const gulp = require('gulp');

const pug = require('./gulp/html');
const server = require('./gulp/server');
const del = require('./gulp/utils/delete');
const part = require('./gulp/utils/part');

const dev = gulp.series(del.dev, server.init, pug.data, pug.compile, pug.watch);

exports.dev = dev;
exports.part = part;
exports.pug = pug.compile;
