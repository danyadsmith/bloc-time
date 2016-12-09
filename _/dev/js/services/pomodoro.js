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
      maxFocusTasks: 5,
      dailyPomodoroGoal: 10
    };

    PomodoroTimer.headings = {
      idle: 'Length of Next Work Session',
      started: 'Work Time Remaining',
      paused: 'Work Session Paused',
      break: 'Break Time Remaining',
      settings: 'Work and Break Session Settings'
    };

    PomodoroTimer.completedPomodoros = 0;
    PomodoroTimer.interruptions = 0;
    
    PomodoroTimer.timerSession = {
      type: 'work',
      state: 'idle',
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

    PomodoroTimer.setProjectedSessionEnd = function(seconds){
      return Date.now() + (seconds * 1000);
    };

    PomodoroTimer.getRemainingTime = function(session) {
      session.remainingTime = Date.parse(this.timerSession.projectedEndTime) - Date.parse(new Date());
      return session.remainingTime;
    };

    PomodoroTimer.getSettings = function(){
      return this.settings;
    };

    PomodoroTimer.getCurrentSessionData = function(){
      return this.timerSession;
    };

    PomodoroTimer.initializeSession = function(){
      this.timerSession.startTime = new Date();
      this.timerSession.projectedEndTime = new Date(this.setProjectedSessionEnd(this.settings.pomodoroLength * 60));
      try { return this.getRemainingTime(this.timerSession); } 
      catch(e){ console.error('Error: ' + e.message); }
    };

    PomodoroTimer.tick = function(){
      this.timerSession.started = true;
      this.timerSession.remainingTime -= 1000; 
    };

    PomodoroTimer.closeSession = function(){
      this.timerSession.started = false;
      this.timerSession.actualEndTime = Date.now();
      this.completedPomodoros++;
    };

    PomodoroTimer.pauseSession = function(){
      this.timerSession.interruptions++;
      this.interruptions++;
      this.timerSession.started = false;
      this.timerSession.paused = true;
    };

    PomodoroTimer.continueSession = function(){
      this.timerSession.resumeTime = Date.now();
      this.timerSession.projectedEndTime = new Date(this.setProjectedSessionEnd(this.timerSession.remainingTime));
      this.timerSession.started = true;
      this.timerSession.paused = false;
    };

    PomodoroTimer.cancelSession = function(){
      this.timerSession.type = 'work';
      this.timerSession.state = 'idle';
      this.timerSession.started = false;
      this.timerSession.paused = false;
      this.timerSession.interruptions = 0;
      this.timerSession.startTime = undefined;
      this.timerSession.resumeTime = undefined;
      this.timerSession.remainingTime = undefined;
      this.timerSession.projectedEndTime = undefined;
      this.timerSession.actualEndTime = undefined;
      this.timerSession.taskID = undefined;
    };

    return PomodoroTimer;
  }

  angular
    .module('blocTime')
    .factory('PomodoroTimer', PomodoroTimer);

})();
