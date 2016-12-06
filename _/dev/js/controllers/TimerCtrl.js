(function(){
  function TimerCtrl(PomodoroTimer){
    this.remaining = PomodoroTimer.startWorkSession(); 
  }

  angular
    .module('blocTime')
    .controller('TimerCtrl', [
      'PomodoroTimer',
      TimerCtrl
    ]);
})();