const server = require('browser-sync').create();

const methods = {
   'server:init': function(done) {
      server.init({
         server: {
            baseDir: './dev'
         }
      });
   
      done();
   },

   'server:reload': function reload(done, stream) {
      server.reload();
   
      done();
   }
};

module.exports = {
   init: methods['server:init'],
   reload: methods['server:reload']
};
