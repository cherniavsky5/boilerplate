'use strict';

// modal-NAME

(function($, APP) {
  APP.Modals.CAMEL = {
    init: function(options) {
      var optionsAssign = Object.assign(APP.ModalOptions, options ? options : {});

      return $('.js-modal-NAME').remodal(optionsAssign);
    },

    open: function() {
      this.instance.open();
    },

    close: function() {
      this.instance.close();
    }
  };
})(jQuery, window.APP);
