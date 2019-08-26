'use strict';

// component-slider-counter

(function($, APP) {
  APP.Components.SliderCounter = {
    init: function(element, options) {
      $(element).html(this.formatNumber(options.current) + ' / ' + this.formatNumber(options.total));
    },

    formatNumber: function(number) {
      return (number < 10) ? '0' + number : number;
    }
  };
})(jQuery, window.APP);
