define([
  './filters'
],
function (filters) {
  'use strict';

  filters.filter('positiveNegative', function () {
    return function(input, threshold) {
      input = +input;
      threshold = threshold ? +threshold : 0;

      return (input > threshold) ? "positive" : ( (input < -threshold) ? "negative" : "" );
    };
  });

});