'use strict';

// component-button

(function($, APP) {
  APP.Components.Button = {
    loading: {
      start: function($el) {
        $($el).addClass('is-loading').attr('disabled', true);
      },

      stop: function($el) {
        $($el).removeClass('is-loading').attr('disabled', false);
      }
    }
  };
})(jQuery, window.APP);
