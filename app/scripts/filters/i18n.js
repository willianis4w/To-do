'use strict';

angular.module('ToDo')
  .filter('i18n', function($locale) {
    return function(str) {
      var offset = 1;
      if (arguments[1] && arguments[1] === 'plural') {
        var n = arguments[2],
            plural;

        switch ($locale.id) {
          case 'pt-br':
          case 'en-us':
          case 'de-de':
          default:
            plural = 0 + (n != 1);
        }

        if (_locales[$locale.id][str]) {
          str = _locales[$locale.id][str][plural] || str;
        }
        offset = 2;
      } else {
        str = _locales[$locale.id][str] || str;
      }

      for (var i = offset; i < arguments.length; i++) {
        str = str.split('%' + (i - offset + 1)).join(arguments[i]);
      }

      return str;
    }
  });