(function(){
  function TimerCtrl(PomodoroTimer){
    this.myTimer = PomodoroTimer;
    this.myTimer.startWorkSession();
    this.workSessionData = this.myTimer.getCurrentWorkSessionData();
  }

  angular
    .module("blocTime")
    .controller("TimerCtrl", [
      "PomodoroTimer",
      TimerCtrl
    ]);
})();