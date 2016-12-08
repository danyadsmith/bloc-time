(function(){
  function PomodoroTimer(){
    var PomodoroTimer = {};
    this.PomodoroTimer = PomodoroTimer;

    PomodoroTimer.settings = {
      pomodoroLength: 1,
      shortBreakLength: 5,
      longBreakLength: 15,
      longBreakAfter: 4,
      autoStartNextPomodoro: false,
      timerTickingVolume: 10,
      maxFocusTasks: 5,
      dailyPomodoroGoal: 10
    };

    PomodoroTimer.headings = {
      idle: "Length of Next Pomodoro",
      started: "Work Time Remaining",
      paused: "Work Time Remaining",
      break: "Break Time Remaining",
      settings: "Work and Break Session Settings"
    };

    PomodoroTimer.completedPomodoros = 0;
    PomodoroTimer.interruptions = 0;
    
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

    PomodoroTimer.setProjectedSessionEnd = function(seconds){
      return Date.now() + (seconds * 1000);
    };

    PomodoroTimer.getRemainingTime = function(session) {
      session.remainingTime = Date.parse(session.projectedEndTime) - Date.parse(new Date());
      return {
        countdown: session.remainingTime
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
    PomodoroTimer.initializeWorkSession = function(){
      this.workSession.startTime = new Date();
      this.workSession.projectedEndTime = new Date(this.setProjectedSessionEnd(this.settings.pomodoroLength * 60));
      try { return this.getRemainingTime(this.workSession); } 
      catch(e){ console.error('Error: ' + e.message); }
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


