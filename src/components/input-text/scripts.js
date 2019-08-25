'use strict';

// component-input-text

(function($, APP) {
  APP.Components.InputText = {
    options: {
      filledClassName: 'is-filled'
    },

    init: function() {
      var component = this;
      var $inputs = $('input:not([type="checkbox"]):not([type="radio"]):not([type="file"])');

      $inputs.each(function() {
        var $input = $(this);

        component.setState($input);

        $input.on('blur', function() {
          component.setState($input);
        });
      });
    },

    setState: function($input) {
      this.isFilled($input) ? $input.addClass(this.options.filledClassName) : $input.removeClass(this.options.filledClassName);
    },

    isFilled: function($input) {
      return ($.trim($input.val()) === '') ? false : true;
    },

    error: function(error, $input) {
      var $inputText = $input.closest('.js-input-text');

      $inputText.addClass('is-error').removeClass('is-valid').append(error);
    },

    success: function($label) {
      var $inputText = $label.closest('.js-input-text');
      
      $label.remove();
      $inputText.removeClass('is-error').addClass('is-valid');
    }
  };
})(jQuery, window.APP);
