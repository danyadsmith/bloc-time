Feature: Pomodoro Work Session Timer

  Scenario: Start Pomodoro
    Given a default length setting for a Pomodoro work session in minutes
    When I click the start button
    Then the timer counts down from the default Pomodoro length to zero
    And the timer displays the remaining time in the work session in minutes and seconds
    And the timer plays a ticking sound at the volume level setting
    And the work session start button is hidden
    And the work session pause button is visible
    And the work session continue button is hidden
    And the work session cancel button is hidden

  Scenario: Pause Pomodoro
    Given a Pomodoro work session was started
    And there is remaining time left in the session
    When I click the pause button
    Then the current active task increments the interruption count by 1
    And the timer stops counting down to zero
    And the timer stops playing the work ticking sound
    And the timer displays the remaining time in the work session in minutes and seconds
    And the work session start button is hidden
    And the work session pause button is hidden
    And the work session continue button is visible
    And the work session cancel button is visible

  Scenario: Continue Pomodoro
    Given a Pomodoro work session was paused
    And there is remaining time left in the session
    When I click the continue button
    Then the timer continues to countdown to zero
    And the timer displays the remaining time in the work session in minutes and seconds
    And the timer plays the work ticking sound
    And the work session start button is hidden
    And the work session pause button is visible
    And the work session cancel button is visible  

  Scenario: Cancel Pomodoro
    Given a Pomodoro work session was started or paused
    And there is remaining time left in the session
    When I click the cancel button
    Then the active Pomodoro timer is reset to the default Pomodoro lenght
    And the start button is visible

  Scenario: Complete Pomodoro
    Given a Pomodoro work session was started
    When the time remaining counts down to zero
    Then the timer stops playing a ticking sound
    And the timer plays a work session alarm
    And the number of Pomodoros for the active task increments by 1
    And the number of Pomodoros since the last break session increments by 1
    And the timer automatically starts the Break session timer
