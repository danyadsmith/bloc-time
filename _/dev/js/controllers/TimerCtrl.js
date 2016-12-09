/* globals angular */

(function(){
  function TimerController($scope, $interval, PomodoroTimer){
    this.PomodoroTimer = PomodoroTimer;
    $scope.heading = PomodoroTimer.headings.idle;
    $scope.started = false;
    $scope.remaining = this.PomodoroTimer.initializeSession();
    $scope.paused = false;

    function updateTimerUI(session, state){
      $scope.heading = PomodoroTimer.headings[state];
      $scope.started = session.started;
      $scope.remaining = session.remainingTime;
      $scope.paused = session.paused;
      setTimerState(state);
    }

    function resetTimer(timer){
      $scope.remaining = timer.initializeSession();
    }

    function setTimerState(state){
      switch (state) {
      case 'idle':
        angular.element(document.querySelector('.timer-panel')).removeClass('work-session');
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

    resetTimer(this.PomodoroTimer);
    updateTimerUI(this.PomodoroTimer.timerSession, 'idle');

    this.countdown = function () {
      this.PomodoroTimer.initializeSession();
      updateTimerUI(this.PomodoroTimer.timerSession, 'started');
      this.session = $interval(function(){
        if(this.PomodoroTimer.timerSession.remainingTime > 0){
          this.PomodoroTimer.tick(); 
          updateTimerUI(this.PomodoroTimer.timerSession, 'started');
        } else if(this.PomodoroTimer.timerSession.remainingTime === 0){
          this.PomodoroTimer.closeSession();
          resetTimer();
          updateTimerUI(this.PomodoroTimer.timerSession, 'idle');
        }
      }.bind(this), 1000, (this.PomodoroTimer.settings.pomodoroLength * 60 + 1));
    };
    this.pause = function(){
      $interval.cancel(this.session);
      this.PomodoroTimer.pauseSession();
      updateTimerUI(this.PomodoroTimer.timerSession, 'paused');
    };
    this.continue = function(){
      this.PomodoroTimer.continueSession();
      updateTimerUI(this.PomodoroTimer.timerSession, 'started');
      this.session = $interval(function(){
        if(this.PomodoroTimer.timerSession.remainingTime > 0){
          this.PomodoroTimer.tick(); 
          updateTimerUI(this.PomodoroTimer.timerSession, 'started');
        } else if(this.PomodoroTimer.timerSession.remainingTime === 0){
          this.PomodoroTimer.closeSession();
          resetTimer(this.PomodoroTimer);
          updateTimerUI(this.PomodoroTimer.timerSession, 'idle');
        }
      }.bind(this), 1000, (this.PomodoroTimer.timerSession.remainingTime/1000 + 1));
    };
    this.cancel = function(){
      $interval.cancel(this.session);
      this.PomodoroTimer.cancelSession();
      resetTimer(this.PomodoroTimer);
      updateTimerUI(this.PomodoroTimer.timerSession, 'idle');
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