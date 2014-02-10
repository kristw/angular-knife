define(['angular'], function(ng){
  var directives = ng.module('ngKnife.directives', []);
  var filters    = ng.module('ngKnife.filters',  []);
  var services   = ng.module('ngKnife.services', []);

filters.filter('iif', function () {
  return function(input, trueValue, falseValue) {
    return input ? trueValue : falseValue;
  };
});

filters.filter('positiveNegative', function () {
  return function(input, threshold) {
    input = +input;
    threshold = threshold ? +threshold : 0;

    return (input > threshold) ? "positive" : ( (input < -threshold) ? "negative" : "" );
  };
});


filters.filter('sign', function () {
  return function(input) {
    input = +input;
    return (input > 0)? ("+" + input) : input;
  };
});


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

// http://stackoverflow.com/questions/15489163/why-does-underscore-defer-fix-so-many-of-my-issues
services.factory('defer', function(){
  return function(fn){
    setTimeout(fn, 1);
  }
});


services.factory('safeApply', function() {
  return function safeApply(scope, fn) {
    if(scope.$$phase || scope.$root.$$phase) fn();
    else scope.$apply(fn);
  };
});

  return angular.module('ngKnife', [
    'ngKnife.directives',
    'ngKnife.filters',
    'ngKnife.services'
  ]);
});