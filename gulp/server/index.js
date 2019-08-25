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

   'server:reload': function reload(done) {
      server.reload();
   
      done();
   },

   'server:stream': function stream(done) {
      server.stream();
   
      // done();
   }
};

module.exports = {
   init: methods['server:init'],
   reload: methods['server:reload'],
   stream: methods['server:stream']
};
