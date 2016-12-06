(function(){
  function PomodoroTimer(){
    var PomodoroTimer = {};
    this.PomodoroTimer = PomodoroTimer;

    PomodoroTimer.settings = {
      pomodoroLength: 25,
      shortBreakLength: 5,
      longBreakLength: 15,
      longBreakAfter: 4,
      autoStartNextPomodoro: false,
      timerTickingVolume: 10,
      maxFocusTasks: 5
    };

    PomodoroTimer.completedPomodoros = 0;
    
    PomodoroTimer.workSession = {
      started: false,
      paused: false,
      interruptions: 0,
      startTime: undefined,
      resumeTime: undefined,
      remainingTime: undefined,
      projectedEndTime: undefined,
      actualEndTime: undefined,
      taskID: undefined
    };

    PomodoroTimer.breakSession = {
      started: false,
      startTime: undefined,
      endTime: undefined
    };

    var setProjectedSessionEnd = function(minutes){
      return Date.now() + ((minutes * 60) * 1000);
    };

    var calcRemainingTime = function(session) {
      session.remainingTime = Date.parse(session.projectedEndTime) - Date.parse(new Date());
      var seconds = Math.floor( (session.remainingTime/1000) % 60);
      var minutes = Math.floor( (session.remainingTime/1000/60) % 60);
      var hours = Math.floor( (session.remainingTime/(1000*60*60)) % 24 );
      var days = Math.floor( session.remainingTime/(1000*60*60*24));
      return {
        minutes: minutes,
        seconds: seconds,
        hours: hours,
        days: days
      };
    };

    PomodoroTimer.getSettings = function(){
      return this.settings;
    };
    PomodoroTimer.getCurrentWorkSessionData = function(){
      return this.workSession;
    };
    PomodoroTimer.getCurrentBreakSessionData = function(){
      return this.breakSession;
    };
    PomodoroTimer.startWorkSession = function(){
      this.workSession.started = true;
      this.workSession.startTime = new Date();
      this.workSession.projectedEndTime = new Date(setProjectedSessionEnd(this.settings.pomodoroLength));
      try { return calcRemainingTime(this.workSession); } 
      catch(e){ console.log('Error: ' + e.message); }
    };
    PomodoroTimer.pauseWorkSession = function(){
      this.workSession.paused = true;
      this.workSession.started = false;
      this.workSession.interruptions += 1;
    };

    return PomodoroTimer;

  }

  angular
    .module('blocTime')
    .factory('PomodoroTimer', PomodoroTimer);

})();


