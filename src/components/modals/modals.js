'use strict';

//////////
// MODALS
//////////
(function($, APP) {
  APP.Components.Modals = {
    init: function() {
      
    },

    submit: function(config) {
      $.ajax(config);
    }
  };
})(jQuery, window.APP);
