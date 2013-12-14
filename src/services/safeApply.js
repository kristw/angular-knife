services.factory('safeApply', function() {
  return function safeApply(scope, fn) {
    if(scope.$$phase || scope.$root.$$phase) fn();
    else scope.$apply(fn);
  };
});