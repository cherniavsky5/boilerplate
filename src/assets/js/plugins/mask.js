//////////
// INPUT MASK
//////////
(function($, APP) {
  APP.Plugins.Mask = {
    init: function() {
      var $inputs = $('[data-mask]');

      $inputs.each(function() {
        var $input = $(this);

        $input.inputmask({
          mask: $input.data('mask')
        });
      });
    }
  };
})(jQuery, window.APP);
