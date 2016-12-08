/* globals angular */

(function(){
  function formatTime(){
    return function(ms){
      var date = new Date(null);
      date.setSeconds(ms/1000);
      return date.toISOString().substr(14,5);
    };

  }

  angular
  .module('blocTime')
  .filter('formatTime', formatTime);
})();