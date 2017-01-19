/* globals angular */

(function(){
  function TimerController($scope, $interval, PomodoroTimer){
    this.PomodoroTimer = PomodoroTimer;
    $scope.heading = PomodoroTimer.headings.idle;
    $scope.started = false;
    $scope.remaining = this.PomodoroTimer.initializeSession();
    $scope.paused = false;
    $scope.type = this.PomodoroTimer.timerSession.type;
    $scope.sessions = PomodoroTimer.sessions;
    $scope.$watch('remaining', function(newVal, oldVal){
      console.log('REMAINING | New value: ' + newVal + ' | Old value: ' + oldVal);
      if(newVal === 0)
        sessionEndSound.play();
    });
    $scope.$watch('heading', function(currVal, pastVal){
      console.log('HEADING | New value: ' + currVal + '| Old value: ' + pastVal);
      if(currVal === 'Focus Time Remaining')
        tickingSound.play().loop();
      else
        tickingSound.stop();
    });

    function updateTimerUI(session, state){
      $scope.heading = PomodoroTimer.headings[state];
      $scope.started = session.started;
      $scope.remaining = session.remainingTime;
      $scope.paused = session.paused;
      $scope.type = session.type;
      setTimerState(state);
    }

    function resetTimer(timer){
      $scope.remaining = timer.initializeSession();
    }

    function setTimerState(state){
      switch (state) {
      case 'idle':
        angular.element(document.querySelector('.timer-panel')).removeClass('work-session').removeClass('paused-session').removeClass('break-session');
        break;
      case 'started':
        angular.element(document.querySelector('.timer-panel')).addClass('work-session').removeClass('paused-session').removeClass('break-session');
        break;
      case 'paused':
        angular.element(document.querySelector('.timer-panel')).addClass('paused-session').removeClass('work-session').removeClass('break-session');
        break;
      case 'break':
        angular.element(document.querySelector('.timer-panel')).addClass('break-session').removeClass('work-session').removeClass('paused-session');
        break;
      default:
        break;
      }
    }

    resetTimer(this.PomodoroTimer);
    updateTimerUI(this.PomodoroTimer.timerSession, 'idle');

    this.countdown = function () {
      this.PomodoroTimer.initializeSession();
      this.session = $interval(function(){
        if(this.PomodoroTimer.timerSession.remainingTime > 0){
          this.PomodoroTimer.timerSession.started = true;
          this.PomodoroTimer.timerSession.state = 'started';
          this.PomodoroTimer.tick();
          if(this.PomodoroTimer.timerSession.type === 'work') 
            updateTimerUI(this.PomodoroTimer.timerSession, 'started');
          else
            updateTimerUI(this.PomodoroTimer.timerSession, 'break');
        }  
        else if(this.PomodoroTimer.timerSession.remainingTime === 0 && this.PomodoroTimer.timerSession.type === 'work'){
          this.PomodoroTimer.closeSession();
          this.PomodoroTimer.timerSession.type = 'break';
          this.PomodoroTimer.initializeSession();
          updateTimerUI(this.PomodoroTimer.timerSession, 'break');
          this.countdown();
        } else if (this.PomodoroTimer.timerSession.remainingTime === 0 && this.PomodoroTimer.timerSession.type === 'break') {
          this.PomodoroTimer.closeSession();
          this.PomodoroTimer.timerSession.type = 'work';
          resetTimer(this.PomodoroTimer);
          updateTimerUI(this.PomodoroTimer.timerSession, 'idle');
        }
      }.bind(this), 1000, (this.PomodoroTimer.getSessionLength() * 60 + 1));
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
          this.PomodoroTimer.timerSession.type = 'break';
          this.PomodoroTimer.initializeSession();
          updateTimerUI(this.PomodoroTimer.timerSession, 'break');
          this.countdown();
        }
      }.bind(this), 1000, (this.PomodoroTimer.timerSession.remainingTime/1000 + 1));
    };
    this.cancel = function(){
      $interval.cancel(this.session);
      this.PomodoroTimer.cancelSession();
      resetTimer(this.PomodoroTimer);
      updateTimerUI(this.PomodoroTimer.timerSession, 'idle');
    };

    var sessionEndSound = new buzz.sound("assets/audio/breakStart.mp3", {
      preload: true,
      volume: 50
    });

    var breakEndSound = new buzz.sound("assets/audio/bikeBell.mp3", {
      preload: true,
      volume: 50
    })

    var tickingSound = new buzz.sound("assets/audio/clockTicking.mp3", {
      preload: true,
      volume: 3
    });
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