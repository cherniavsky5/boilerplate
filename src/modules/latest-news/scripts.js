'use strict';

// component-latest-news

(function($, APP) {
  APP.Modules.LatestNews = {
    instance: undefined,

    init: function(options) {
      this.instance = new Swiper('.js-latest-news-slider', {
        init: false,
        slidesPerView: 2,
        slidesPerGroup: 2,
        wrapperClass: 'js-slider-wrapper',
        slideClass: 'js-slider-slide',
        spaceBetween: 15,
        navigation: {
          prevEl: '.js-latest-news-slider-prev',
          nextEl: '.js-latest-news-slider-next'
        },
      });
    }
  };
})(jQuery, window.APP);
