"use strict";

this.World = require("../support/world.js");

module.exports = function(){
 this.Given(/^a default length setting for a Pomodoro work session in minutes$/, function (callback) {
   // Write code here that turns the phrase above into concrete actions
    callback(this.PomodoroLength > 0);
  });

 this.When(/^I click the start button$/, function (callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

 this.Then(/^I am redirected to the Pomodoro Session In Progress View$/, function (callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

 this.Then(/^the timer counts down from the default Pomodoro length to zero$/, function (callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

 this.Then(/^the timer displays the remaining time in the work session in minutes and seconds$/, function (callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

 this.Then(/^the first available task in the MIT list changes to an active state$/, function (callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

 this.Then(/^the timer plays a ticking sound at the volume level setting$/, function (callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

 this.Then(/^the work session start button is hidden$/, function (callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

 this.Then(/^the work session pause button is visible$/, function (callback) {
   // Write code here that turns the phrase above into concrete actions
   callback(null, 'pending');
  });

 this.Then(/^the work session continue button is hidden$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

 this.Then(/^the work session cancel button is hidden$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

}