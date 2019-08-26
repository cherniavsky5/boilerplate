if (typeof Object.assign != 'function') {
  Object.assign = function(target, varArgs) {
    'use strict';
    
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

window.APP = window.APP || {};

APP.Plugins = APP.Plugins || {};
APP.Components = APP.Components || {};
APP.Modules = APP.Modules || {};
APP.Modals = APP.Modals || {};

APP.ModalOptions = {
  hashTracking: false,
  closeOnConfirm: true,
  closeOnCancel: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  modifier: '',
  appendTo: document.body
};

$.validator.addMethod('tel', function(value, element) {
  return /^\+\d\s\(\d{3}\)\s[\d]{3}-[\d]{2}-[\d]{2}$/.test(value);
});

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
          // APP.Plugins.AOS.refresh();
          app.onLoadTrigger();
        };
    
        // Global plugins which must be initialized once
        app.initGlobalPlugins = function() {
          // APP.Plugins.Barba.Cabinet.init();
          // APP.Plugins.Barba.User.init();
        };
    
        // Plugins which depends on DOM and page content
        app.initPlugins = function(fromPjax) {
          // APP.Plugins.Remodal.init();
          APP.Plugins.Mask.init();
          APP.Plugins.SumoSelect.init();
        };
    
        // All components from `src/components`
        app.initComponents = function(fromPjax) {
          // APP.Components.Test.init();

          APP.Modules.WorkTips.init();

          APP.Modules.CurrentShares.init();

          APP.Modules.LatestNews.init();

          APP.Modules.MainNavbar.init();

          APP.Modules.PageAside.init();

          APP.Components.InputText.init();

          APP.Components.Dropzone.uploadChildAvatar.init({
            url: "/dev/temp"
          });


          var signUpValidate = {
            rules: {
              name: {
                required: true
              },
              email: {
                required: true,
                email: true
              },
              tel: {
                required: true
              },
              password: {
                required: true,
                minlength: 6
              },
              repassword: {
                required: true,
                equalTo: '.js-input-password'
              },
              agree: {
                required: true
              }
            },

            messages: {
              name: {
                required: 'Ввведите ФИО'
              },
              email: {
                required: 'Введите адрес электронной почты',
                email: 'Некорректый E-mail'
              },
              tel: {
                required: 'Введите номер телефона',
                tel: 'Некорректный номер телефона'
              },
              password: {
                required: 'Введите пароль',
                minlength: 'Минимальная длина пароля - 6 символов'
              },
              repassword: {
                required: 'Повторите пароль',
                equalTo: 'Пароли не совпадают'
              },
            }
          };

          var optionsAJAX = {
            method: 'POST',
            url: 'http://httpbin.org/post',
          };

          APP.Modules.SignUp.init(signUpValidate, optionsAJAX);



          
          var signInValidate = {
            rules: {
              email: {
                required: true,
                email: true
              },
              tel: {
                required: true
              },
              password: {
                required: true
              },
              agree: {
                required: true
              }
            },

            messages: {
              email: {
                required: 'Введите адрес электронной почты',
                email: 'Некорректый E-mail'
              },
              tel: {
                required: 'Введите номер телефона',
                tel: 'Некорректный номер телефона'
              },
              password: {
                required: 'Введите пароль'
              },
            }
          };


          APP.Modules.SignIn.init(signInValidate, optionsAJAX);





          var forgoutPasswordValidate = {
            rules: {
              email: {
                required: true,
                email: true
              }
            },

            messages: {
              email: {
                required: 'Введите адрес электронной почты',
                email: 'Некорректый E-mail'
              }
            }
          };


          APP.Modules.ForgoutPassword.init(forgoutPasswordValidate, optionsAJAX);




          APP.Modules.Child.Add.init({
            rules: {
               name: {
                  required: true
               },
               lastname: {
                  required: true
               },
               date: {
                  required: true
               }
            },

            messages: {
               name: {
                  required: 'Ввведите имя ребёнка'
               },
               lastname: {
                  required: 'Ввведите фамилию ребёнка'
               },
               date: {
                  required: 'Укажите дату рождения'
               }
            }
          });
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
