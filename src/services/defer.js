// http://stackoverflow.com/questions/15489163/why-does-underscore-defer-fix-so-many-of-my-issues
services.factory('defer', function(){
  return function(fn){
    setTimeout(fn, 1);
  }
});
