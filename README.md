# Bloc Time
### A Pomodoro Timer with an integrated Task List

This project was inspired by the [Pomodoro Technique](http://cirillocompany.de/pages/pomodoro-technique) by Francesco Cirillo, the blog post [Purpose Your Day: Most Important Task \(MIT\)](https://zenhabits.net/purpose-your-day-most-important-task/) by Leo Babauta and other similar ideas, including the [Productivity Planner](https://www.intelligentchange.com/products/the-productivity-planner?gclid=CO2H0cKGvNACFZCMaQod5h8LgQ) by Intelligent Change. 

### Background

I use the Pomodoro Technique to help avoid distractions and focus on critical tasks at work and while studying or working on creative projects. I have tried several Pomodoro timers for iOS and Mac OS, and while I've settled upon a timer that I currently use daily, it still lacks features that are important to me. The goal of this project is to create a Pomodoro Timer with an integrated **Most Important Tasks** list that stores task and session history for later data mining and review. 

### Technology Stack

* Cucumber.js
* MongoDB
* Express.js
* Angular.js 
* Node.js

### Features

![Pomodoro Timer: Default View](\_/comps/work_session_not_started.png)

#### Timer

* Session and Break lengths are customizable in settings
* Number of sessions to trigger a long break is customizable in settings
* When an active work session is paused, the Interruptions counter increments by 1
* The volume of the timer ticking sound is configurable in settings

#### Most Important Tasks

* Tasks are listed in Priority order
* A limited number of tasks can be added to the MIT list based on settings
* Tasks can only be added or edited during breaks or while the timer is inactive
* Completed Pomodoro sessions automatically apply to the highest priority incomplete task
* Completed tasks remain visible in the MIT list until they are archived

![Pomodoro Timer: Default View](\_/comps/work_session_started.png)

![Pomodoro Timer: Default View](\_/comps/work_session_paused.png)

![Pomodoro Timer: Default View](\_/comps/break_session_started.png)

![Pomodoro Timer: Default View](\_/comps/settings_view.png)

