'use strict';

// component-work-tips

(function($, APP) {
  APP.Modules.WorkTips = {
    instance: undefined,

    init: function(options) {
      var $counter = $('.js-work-tips-slider-counter');

      this.instance = new Swiper('.js-work-tips-slider', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        wrapperClass: 'js-slider-wrapper',
        slideClass: 'js-slider-slide',
        spaceBetween: 15,
        navigation: {
          prevEl: '.js-work-tips-slider-prev',
          nextEl: '.js-work-tips-slider-next'
        },

        on: {
          slideChange: function() {
            APP.Components.SliderCounter.init($counter, {
              current: (this.progress > 0) ? this.progress * this.slides.length : this.params.slidesPerView,
              total: this.slides.length
            });
          }
        }
      });

      APP.Components.SliderCounter.init($counter, {
        current: this.instance.params.slidesPerView,
        total: this.instance.slides.length
      });
    }
  };
})(jQuery, window.APP);
