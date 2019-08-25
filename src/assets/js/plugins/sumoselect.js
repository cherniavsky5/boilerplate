//////////
// SUMOSELECT
//////////
(function($, APP) {
  APP.Plugins.SumoSelect = {
    init: function() {
      var $selects = $('.js-select');

      $selects.each(function() {
        var $select = $(this);

        $select.SumoSelect();
      });
    }
  };
})(jQuery, window.APP);
