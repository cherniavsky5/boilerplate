'use strict';

// component-sign-up

(function($, APP) {
  APP.Modules.SignUp = {
    init: function(options, ajax) {
      var component = this;
      var $form = $('.js-form-sign-up');

      options = Object.assign({
        errorElement: 'span',
        errorPlacement: function(error, element) {
          APP.Components.InputText.error(error, element);
        },

        success: function(label) {
          APP.Components.InputText.success(label);
        },

        submitHandler: function(form) {
          var validate = this;

          var buttonLoading = APP.Components.Button.loading;

          $.ajax(Object.assign({
            method: 'POST',
            data: component.form.serialize(),
            beforeSend: function() {
              buttonLoading.start(validate.submitButton);
            }
          }, ajax)).done(function(msg) {
            setTimeout(function() {
              buttonLoading.stop(validate.submitButton);
            }, 2000);
          });
        }
      }, options);

      $form.validate(options);

      return this;
    }
  };
})(jQuery, window.APP);
