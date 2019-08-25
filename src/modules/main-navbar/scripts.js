'use strict';

// component-main-navbar

(function($, APP) {
  APP.Modules.MainNavbar = {
    element: $('.js-main-navbar'),
    hideClass: 'is-hide',
    lastScrollTop: 0,

    init: function(options) {
      this.element.stick_in_parent();

      $(window).on('scroll', this.toggleOnScroll.bind(this));
    },

    toggleOnScroll: function(event) {
      if ($(window).width() < 1140) {
        var scrollTop = $(window).scrollTop();
        
        if (Math.abs(this.lastScrollTop - scrollTop) > this.getHeight() / 2) {
          if (scrollTop > this.lastScrollTop){
            this.element.addClass(this.hideClass);
          } else {
            this.element.removeClass(this.hideClass);
          }
  
          this.lastScrollTop = scrollTop;
        }
      }
    },

    getHeight: function() {
      return this.element.outerHeight()
    }
  };
})(jQuery, window.APP);
