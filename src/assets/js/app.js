window.APP = window.APP || {};

APP.Plugins = APP.Plugins || {};
APP.Components = APP.Components || {};
APP.Helpers = APP.Helpers || {};

var _document = $(document);
var _window = $(window);

(function($, APP) {
  APP.Initilizer = function() {
    var app = {};

    app.init = function() {
      app.initGlobalPlugins();
      app.initPlugins();
      app.initComponents();
    };

    app.onLoadTrigger = function() {
      // APP.Plugins.Preloader.loaded();
      // APP.Plugins.LazyLoadImages.init();
    };

    app.refresh = function() {
      app.initPlugins(true);
      app.initComponents(true);
    };

    app.destroy = function() {};

    // pjax triggers
    app.newPageReady = function() {
      app.refresh();
    };

    app.transitionCompleted = function() {
      APP.Plugins.AOS.refresh();
      app.onLoadTrigger();
    };

    // Global plugins which must be initialized once
    app.initGlobalPlugins = function() {
      // APP.Plugins.Barba.init();
    };

    // Plugins which depends on DOM and page content
    app.initPlugins = function(fromPjax) {
      // APP.Plugins.Remodal.init();
    };

    // All components from `src/componenets`
    app.initComponents = function(fromPjax) {
      APP.Components.Example.init();
    };

    return app;
  };

  // a.k.a. ready
  $(function() {
    APP.Initilizer().init();
  });

  _window.on('load', function() {
    $.ready.then(function() {
      APP.Initilizer().onLoadTrigger();
    });
  });
})(jQuery, APP);
