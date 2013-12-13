define([
  './filters'
],
function (filters) {
  'use strict';

  filters.filter('sign', function () {
    return function(input) {
      input = +input;
      return (input > 0)? ("+" + input) : input;
    };
  });

});