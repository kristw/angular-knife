filters.filter('sign', function () {
  return function(input) {
    return (+input > 0)? ("+" + input) : input;
  };
});