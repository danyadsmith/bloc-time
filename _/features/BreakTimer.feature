Feature: Pomodoro Break Session Timer

  Scenario: Start Short Break
    Given a Pomodoro work session has completed
    And the number of work sesssions since the last break is less than the number of work sessions that trigger a long break 
    Then the Short Break timer counts down from the Short Break length setting to zero
    And the break session cancel button is visible

  Scenario: Start Long Break
    Given a Pomodoro work session has completed
    And the number of work sessions since the last break is equal to the number of work sessions that trigger a long break
    Then the Long Break timer counts down from the Long Break length setting to zero
    And the break session cancel button is visible