'use strict';

// component-child

(function($, APP) {
  APP.Modules.Child = {
    Add: {
      instance: undefined,

      init: function(options) {
        var $form = $('.js-child-form-add');

        options = Object.assign({
          errorElement: 'span',
          errorPlacement: function(error, element) {
            APP.Components.InputText.error(error, element);
          },

          success: function(label) {
            APP.Components.InputText.success(label);
          }
        }, options);

        this.instance = $form.validate(options);
      }
    }
  };
})(jQuery, window.APP);
