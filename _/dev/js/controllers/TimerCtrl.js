/* globals angular */

(function(){
  function TimerController($scope, $interval, PomodoroTimer){
    this.PomodoroTimer = PomodoroTimer;
    $scope.heading = PomodoroTimer.headings.idle;
    $scope.started = false;
    $scope.remaining = this.PomodoroTimer.initializeSession(this.PomodoroTimer.timerSession.type);
    $scope.paused = false;

    function updateTimerUI(session, state){
      $scope.heading = PomodoroTimer.headings[state];
      $scope.started = session.started;
      $scope.remaining = session.remainingTime;
      $scope.paused = session.paused;
      setTimerState(state);
    }

    function resetTimer(timer){
      $scope.remaining = timer.initializeSession(timer.timerSession.type);
    }

    function setTimerState(state){
      switch (state) {
      case 'idle':
        angular.element(document.querySelector('.timer-panel')).removeClass('work-session').removeClass('paused-session');
        break;
      case 'started':
        angular.element(document.querySelector('.timer-panel')).addClass('work-session').removeClass('paused-session');
        break;
      case 'paused':
        angular.element(document.querySelector('.timer-panel')).addClass('paused-session');
        break;
      case 'break':
        angular.element(document.querySelector('.timer-panel')).addClass('break-session');
        break;
      default:
        break;
      }
    }

    var setStarted = function(timer){ updateTimerUI(timer.timerSession, 'started'); };
    var setPaused = function(timer){ updateTimerUI(timer.timerSession, 'paused'); };
    var setIdle = function(timer){ updateTimerUI(timer.timerSession, 'idle'); };
    var setBreak = function(timer) { updateTimerUI(timer.timerSession, 'break'); };
    var timerInit = function(timer) { setStarted(timer); timer.initializeSession(timer.timerSession.type); };
    var timerTick = function(timer) { timer.tick(); setStarted(timer); };
    var timerPause = function(session, timer) { $interval.cancel(session); timer.pauseSession(); setPaused(timer); };
    var timerDispose = function(timer) { timer.closeSession(); resetTimer(timer); setBreak(timer); timer.initializeSession(timer.timerSession.type); };
    var timerContinue = function(timer) { timer.continueSession(); setStarted(timer); };
    var timerCancel = function(session, timer) { $interval.cancel(session); timer.cancelSession(); resetTimer(timer); setIdle(timer); };

    resetTimer(this.PomodoroTimer);
    updateTimerUI(this.PomodoroTimer.timerSession, 'idle');

    this.countdown = function () {
      timerInit(this.PomodoroTimer);
      this.session = $interval(function(){
        if(this.PomodoroTimer.timerSession.remainingTime > 0){
          timerTick(this.PomodoroTimer);
        } else if (this.PomodoroTimer.timerSession.remainingTime === 0) {
          timerDispose(this.PomodoroTimer);
        }
      }.bind(this), 1000, (this.PomodoroTimer.getSessionLength(this.PomodoroTimer.timerSession.type) * 60 + 1));
    };
    this.pause = function(){
      timerPause(this.session, this.PomodoroTimer);
    };
    this.continue = function(){
      timerContinue(this.PomodoroTimer);
      this.session = $interval(function(){
        if(this.PomodoroTimer.timerSession.remainingTime > 0){
          timerTick(this.PomodoroTimer);
        } else if(this.PomodoroTimer.timerSession.remainingTime === 0){
          timerDispose(this.PomodoroTimer);
        }
      }.bind(this), 1000, (this.PomodoroTimer.timerSession.remainingTime/1000 + 1));
    };
    this.cancel = function(){
      timerCancel(this.session, this.PomodoroTimer);
    };  
  }

  angular
    .module('blocTime')
    .controller('TimerController', [
      '$scope',
      '$interval',
      'PomodoroTimer',
      TimerController
    ]);
})();