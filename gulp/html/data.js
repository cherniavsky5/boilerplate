const gulp = require('gulp');
const path = require('path');
const merge = require('gulp-merge-json');
const camel = require('to-camel-case');

const methods = {
   'pug:data': function() {
      return gulp.src('./src/**/*.json')
         .pipe(merge({
            fileName: 'data.json',
            edit: (json, file) => {
               // Extract the filename and strip the extension
               let filename = path.basename(file.path),
                   primaryKey = filename.replace(path.extname(filename), '');

                   if (filename === 'data.json') {
                      primaryKey = camel(path.relative('./src/modules', path.dirname(file.path)));
                   }
   
               // Set the filename as the primary key for our JSON data
               let data = {};
               data[primaryKey.toUpperCase()] = json;
   
               return data;
            }
         }))
         .pipe(gulp.dest('./dev/temp'));
   }
};

module.exports = methods['pug:data'];
