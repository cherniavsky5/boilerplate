const del = require('del');

function dev() {
   return del('./dev/**', {
      force: true
   });
}

exports.dev = dev;
