
/** attach filters to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array in app.js.
 **/
define('filters/filters',['angular'], function (ng) {
  
  return ng.module('ngKnife.filters', []);
});
define('filters/iif',[
  './filters'
],
function (filters) {
  

  filters.filter('iif', function () {
    return function(input, trueValue, falseValue) {
      return input ? trueValue : falseValue;
    };
  });

});
define('filters/positiveNegative',[
  './filters'
],
function (filters) {
  

  filters.filter('positiveNegative', function () {
    return function(input, threshold) {
      input = +input;
      threshold = threshold ? +threshold : 0;

      return (input > threshold) ? "positive" : ( (input < -threshold) ? "negative" : "" );
    };
  });

});
define('filters/sign',[
  './filters'
],
function (filters) {
  

  filters.filter('sign', function () {
    return function(input) {
      input = +input;
      return (input > 0)? ("+" + input) : input;
    };
  });

});
define('filters/truncate',[
  './filters'
],
function (filters) {
  

  /**
   * Truncate Filter
   * @Param string
   * @Param int, default = 10
   * @Param string, default = "..."
   * @return string
   */
  filters.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }
    };
  });

});
/** attach services to this module
 * if you get 'unknown {x}Provider' errors from angular, be sure they are
 * properly referenced in one of the module dependencies in the array in app.js.
 **/
define('services/services',['angular'], function (ng) {
  
  return ng.module('ngKnife.services', []);
});
define('services/debounce',[
  './services'
], function (services) {
  
  // From http://stackoverflow.com/questions/13320015/how-to-write-a-debounce-service-in-angularjs
  // Gist from https://gist.github.com/Aaronius/5592373
  services.factory('debounce', function($timeout, $q) {
    return function(func, wait, immediate) {
      var timeout;
      var deferred = $q.defer();
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if(!immediate) {
            deferred.resolve(func.apply(context, args));
            deferred = $q.defer();
          }
        };
        var callNow = immediate && !timeout;
        if ( timeout ) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(later, wait);
        if (callNow) {
          deferred.resolve(func.apply(context,args));
          deferred = $q.defer();
        }
        return deferred.promise;
      };
    };
  });
});
/**
 * loads sub modules and wraps them up into the main module
 */
define('ngKnife',[
  'angular',
  // modules
  'filters/iif',
  'filters/positiveNegative',
  'filters/sign',
  'filters/truncate',
  'services/debounce',
], function (ng) {
  

  return ng.module('ngKnife', [
    'ngKnife.filters',
    'ngKnife.services'
  ]);
});