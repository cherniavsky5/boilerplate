'use strict';

// component-input-file

(function($, APP) {
  APP.Components.Dropzone = {
    uploadChildAvatar: {
      instance: undefined,

      init: function(options) {
        var $dropzone = $('.js-upload-child-avatar'),
            $preview = $dropzone.find('.dz-preview');

        options = Object.assign(options, {
          previewsContainer: $preview.get(0),
          previewTemplate: $preview.html()
        });

        $preview.html('');

        if ($dropzone.length) {
          this.instance = new Dropzone($dropzone.get(0), options);
        }
      }
    }
  };
})(jQuery, window.APP);
