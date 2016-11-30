/* global angular  */
(function(){
  function config($stateProvider, $locationProvider){
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
    $stateProvider
      .state("landing", {
        url: "/",
        views: {
          'tasksPanel': {
            controller: "TasksCtrl as tasks",
            templateUrl: "/templates/most_important_tasks.html"
          },
          'timerPanel': {
            controller: "TimerCtrl as timer",
            templateUrl: "/templates/timer.html"
          }
        }
      })
      .state("settings", {
        url: "/settings",
        views: {
          'tasksPanel': {
            controller: "TasksCtrl as tasks",
            templateUrl: "/templates/most_important_tasks.html"
          },
          'timerPanel': {
            controller: "SettingsCtrl as settings",
            templateUrl: "/templates/settings.html"
          }
        }
      })
      .state("history", {
        url: "/history",
        views: {
          'tasksPanel': {
            controller: "TasksCtrl as tasks",
            templateUrl: "/templates/most_important_tasks.html"
          },
          'timerPanel': {
            controller: "HistoryCtrl as history",
            templateUrl: "/templates/history.html"
          }
        }
      });
  }

  angular
    .module("blocTime", [
      "ui.router"
    ])
    .config(config);

})();