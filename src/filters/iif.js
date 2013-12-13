define([
  './filters'
],
function (filters) {
  'use strict';

  filters.filter('iif', function () {
    return function(input, trueValue, falseValue) {
      return input ? trueValue : falseValue;
    };
  });

});