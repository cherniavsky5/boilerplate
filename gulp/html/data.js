const gulp = require('gulp');
const path = require('path');
const merge = require('gulp-merge-json');

const methods = {
   'pug:data': function() {
      return gulp.src('./src/data/**/*.json')
         .pipe(merge({
            fileName: 'data.json',
            edit: (json, file) => {
               // Extract the filename and strip the extension
               let filename = path.basename(file.path),
                   primaryKey = filename.replace(path.extname(filename), '');
   
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
