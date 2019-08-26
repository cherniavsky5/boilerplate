'use strict';

// component-current-shares

(function($, APP) {
  APP.Modules.CurrentShares = {
    instance: undefined,

    init: function(options) {
      this.instance = new Swiper('.js-current-shares-slider', {
        init: false,
        slidesPerView: 2,
        slidesPerGroup: 2,
        wrapperClass: 'js-slider-wrapper',
        slideClass: 'js-slider-slide',
        spaceBetween: 15,
        navigation: {
          prevEl: '.js-current-shares-slider-prev',
          nextEl: '.js-current-shares-slider-next'
        },
      });
    }
  };
})(jQuery, window.APP);
