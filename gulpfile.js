const gulp = require('gulp');

const pug = require('./gulp/html');
const server = require('./gulp/server');
const del = require('./gulp/utils/delete');
const component = require('./gulp/utils/component');

const dev = gulp.series(del.dev, server.init, pug.data, pug.compile, pug.watch);

exports.dev = dev;
exports.component = component;
exports.pug = pug.compile;
