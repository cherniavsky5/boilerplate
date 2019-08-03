'use strict';

//////////
// component-NAME
//////////
(function($, APP) {
  APP.Modals.CAMEL = {
    init: function() {
      return $('.js-modal-NAME').remodal();
    },

    open: function() {
      this.instance.open();
    },

    close: function() {
      this.instance.close();
    }
  };
})(jQuery, window.APP);
