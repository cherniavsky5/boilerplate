const gulp = require('gulp');
const concat = require('gulp-concat');

const pug = require('./gulp/html');
const css = require('./gulp/css');
const server = require('./gulp/server');
const del = require('./gulp/utils/delete');
const part = require('./gulp/utils/part');


function fonts() {
  return gulp.src('./src/assets/fonts/**/*')
    .pipe(gulp.dest('./dev/assets/fonts'));
}

function img() {
  return gulp.src('./src/assets/img/**/*')
    .pipe(gulp.dest('./dev/assets/img'));
}

function scripts() {
  return gulp.src([
    './node_modules/swiper/dist/js/swiper.js',
    './node_modules/sticky-kit/dist/sticky-kit.js',
    './node_modules/barba.js/dist/barba.js',
    './node_modules/air-datepicker/dist/js/datepicker.js',
    './node_modules/inputmask/dist/jquery.inputmask.bundle.js',
    './node_modules/sumoselect/jquery.sumoselect.js',
    './node_modules/dropzone/dist/dropzone.js',
    './node_modules/jquery-validation/dist/jquery.validate.js',
    'src/assets/js/main.js',
    'src/assets/js/plugins/*.js',
    'src/components/**/*.js',
    'src/modules/**/*.js',
    'src/modals/**/*.js'
  ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dev/assets/js'));
}

function scriptsWatch(done) {
  gulp.watch('./src/**/*.js', gulp.series(scripts, server.reload));

  done();
}

function imgsWatch(done) {
  gulp.watch('./src/assets/img/**/*', gulp.series(img, server.reload));

  done();
}

const dev = gulp.series(del.dev, server.init, pug.data, pug.transform, pug.compile, gulp.parallel(css.compile, fonts, scripts, img), gulp.parallel(pug.watch, css.watch, scriptsWatch, imgsWatch));

exports.dev = dev;
exports.part = part;

exports.data = pug.data;
exports.compile = pug.compile;
exports.transform = pug.transform;
