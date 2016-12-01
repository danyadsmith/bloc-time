(function(){
  function PomodoroTimer($rootScope){
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

    var sessionCountdown = function(session, $containerID){
      var clock = document.getElementById($containerID), 
      pomodoroEnd = new Date(session.projectedEndTime);
      session.remainingTime = countdown(pomodoroEnd).toString().replace(" minutes", ":00").replace(" seconds", "");
      setInterval(function(){
        session.remainingTime = countdown(pomodoroEnd).toString().replace(" minutes and ", ":").replace(" seconds", "");
      }, 1000);
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
        try { sessionCountdown(this.workSession, "test"); } catch(e){ console.log("Error: " + e.message); }
      };
    PomodoroTimer.pauseWorkSession = function(){
        this.workSession.paused = true;
        this.workSession.started = false;
        this.workSession.interruptions += 1;
      };

    return PomodoroTimer;

  }

  angular
    .module("blocTime")
    .factory("PomodoroTimer", [
      "$rootScope", 
      PomodoroTimer
    ]);

})();


