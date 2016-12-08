/* globals angular */

(function(){
  function TimerCtrl($interval, PomodoroTimer){
    this.PomodoroTimer = PomodoroTimer;
    this.heading = PomodoroTimer.headings.idle;
    this.remaining = PomodoroTimer.initializeWorkSession().countdown;




    // save the interval and cancel it when necessary
    this.countdown = function () {
      angular.element(document.querySelector('.timer-panel')).addClass('work-session');
      this.heading = PomodoroTimer.headings.started;
      this.PomodoroTimer.workSession.startTime = new Date();
      this.PomodoroTimer.workSession.projectedEndTime = new Date(this.PomodoroTimer.setProjectedSessionEnd(this.PomodoroTimer.settings.pomodoroLength));
      this.PomodoroTimer.workSession.started = true;
      this.session = $interval(function(){
        if(this.PomodoroTimer.workSession.remainingTime > 0){
          this.PomodoroTimer.workSession.remainingTime -= 1000;
          this.remaining = this.PomodoroTimer.workSession.remainingTime;
          this.started = this.PomodoroTimer.workSession.started;
        } else if(this.PomodoroTimer.workSession.remainingTime === 0){
          this.PomodoroTimer.workSession.started = false;
          this.PomodoroTimer.workSession.actualEndTime = Date.now();
          this.PomodoroTimer.completedPomodoros++;
          this.started = this.PomodoroTimer.workSession.started;
          angular.element(document.querySelector('.timer-panel')).removeClass('work-session');
          this.remaining = PomodoroTimer.initializeWorkSession().countdown;
          this.heading = PomodoroTimer.headings.idle;
        }
      }.bind(this), 1000, (this.PomodoroTimer.settings.pomodoroLength * 60 + 1));
    };
    this.pause = function(){
      $interval.cancel(this.session);
      angular.element(document.querySelector('.timer-panel')).addClass('paused-session');
      this.heading = PomodoroTimer.headings.paused;
      this.PomodoroTimer.workSession.interruptions++;
      this.PomodoroTimer.interruptions++;
      this.PomodoroTimer.workSession.started = false;
      this.PomodoroTimer.workSession.paused = true;
      this.paused = this.PomodoroTimer.workSession.paused;
      this.started = this.PomodoroTimer.workSession.started;
      this.remaining = this.PomodoroTimer.workSession.remainingTime;
    };
    this.continue = function(){
      $interval.cancel(this.session);
      angular.element(document.querySelector('.timer-panel')).removeClass('paused-session');
      angular.element(document.querySelector('.timer-panel')).addClass('work-session');
      this.heading = PomodoroTimer.headings.started;
      this.PomodoroTimer.workSession.resumeTime = Date.now();
      this.PomodoroTimer.workSession.projectedEndTime = new Date(this.PomodoroTimer.setProjectedSessionEnd(this.PomodoroTimer.workSession.remainingTime));
      this.PomodoroTimer.workSession.started = true;
      this.PomodoroTimer.workSession.paused = false;
      this.started = this.PomodoroTimer.workSession.started;
      this.paused = this.PomodoroTimer.workSession.paused;
      this.session = $interval(function(){
        if(this.PomodoroTimer.workSession.remainingTime > 0){
          this.PomodoroTimer.workSession.remainingTime -= 1000;
          this.remaining = this.PomodoroTimer.workSession.remainingTime;
          this.started = this.PomodoroTimer.workSession.started;
        } else if(this.PomodoroTimer.workSession.remainingTime === 0){
          this.PomodoroTimer.workSession.started = false;
          this.PomodoroTimer.workSession.actualEndTime = Date.now();
          this.PomodoroTimer.completedPomodoros++;
          this.started = this.PomodoroTimer.workSession.started;
          angular.element(document.querySelector('.timer-panel')).removeClass('work-session');
          this.remaining = PomodoroTimer.initializeWorkSession().countdown;
          this.heading = PomodoroTimer.headings.idle;
        }
      }.bind(this), 1000, (this.PomodoroTimer.workSession.remainingTime/1000 + 1));
    }
    this.cancel = function(){
      $interval.cancel(this.session);
      angular.element(document.querySelector('.timer-panel')).removeClass('work-session').removeClass('paused-session');
      this.heading = PomodoroTimer.headings.idle;
      this.remaining = PomodoroTimer.initializeWorkSession().countdown;
      this.PomodoroTimer.workSession.interruptions = 0;
      this.PomodoroTimer.workSession.started = false;
      this.PomodoroTimer.workSession.paused = false;
      this.PomodoroTimer.workSession.startTime = undefined;
      this.PomodoroTimer.workSession.resumeTime =undefined;
      this.PomodoroTimer.workSession.remainingTime =undefined;
      this.PomodoroTimer.workSession.projectedEndTime =undefined;
      this.PomodoroTimer.workSession.actualEndTime =undefined;
      this.paused = this.PomodoroTimer.workSession.paused;
      this.started = this.PomodoroTimer.workSession.started;
    }
  }

  angular
    .module('blocTime')
    .controller('TimerCtrl', [
      '$interval',
      'PomodoroTimer',
      TimerCtrl
    ]);
})();