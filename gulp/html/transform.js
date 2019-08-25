const gulp = require('gulp');
const gulpif = require('gulp-if');
const insert = require('gulp-insert');
const path = require('path');
const emitty = require('emitty').setup('src', 'pug');

const methods = {
   'pug:transform': function() {
      return gulp
         .src('./src/**/*.pug')
         .pipe(insert.transform(function(contents, file) {
            const regExpInclude = /^include\s{\s[a-z,\s-]+}\sfrom\s[components|modules|modals]+$/gim;
            const regExpParts = /{[a-z,\s-}]+}/gim;
            
            contents = contents.replace(regExpInclude, function(match) {
               let includes = '';

               let includesMatch = match.match(regExpParts);
               let folder = match.match(/[components|modules|modals]+$/g)[0];

               for (let i = 0; i < includesMatch.length; i++) {
                  let parts = includesMatch[i].split(',');

                  for (var k = 0; k < parts.length; k++) {
                     let part = parts[k].replace(/{|}+/g, '').trim();
                     let pathToPart = path.relative(file.path, `./dev/temp/${folder}`);

                     includes += `include ${pathToPart}${path.sep}${part}${path.sep}template\n`;
                  }
                  
               }

               return includes;
            });


            let pathToAssets = path.relative(path.dirname(file.relative), './assets/').replace(/\\/g, '/');
            
            contents = contents.replace(/\s+<!-- start(?!<!)[^\[>][\s\S]*?-->/g, function(match) {
               return `\n${match}`;
            });

            contents = contents.replace(/<!-- end(?!<!)[^\[>][\s\S]*?-->/g, function(match) {
               return `${match}\n`;
            });

            contents = contents.replace('assets', pathToAssets);

            return contents;
         }))
         .pipe(gulp.dest('./dev/temp'))
   }
};

module.exports = methods['pug:transform'];
