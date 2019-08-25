'use strict';

// component-page-aside

(function($, APP) {
  APP.Modules.PageAside = {
    element: $('.js-page-aside'),
    init: function(options) {
      this.element.stick_in_parent();
    }
  };
})(jQuery, window.APP);
