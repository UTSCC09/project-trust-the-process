# CSCC09 Project Proposal

## Team Members

Steven Hans Limantoro steven.limantoro@mail.utoronto.ca

Vignesh Nanthakumar vignesh.nanthakumar@mail.utoronto.ca

Prashanth Ketheeswaran prashanth.ketheeswaran@mail.utoronto.ca

## Project Description

We will build a virtual fitness application to accompany users in their workout activities. Users will be able to track the types of their workout, create sets of personal workout plans, and view a detailed report of their workout both in the application and in their emails.

This web application will be built by using real time video streaming and computer vision to detect and classify the specific type of exercise. The application will then store this data, so that it can generate a personal fitness report and profile for each user. 

## Beta Version Features

1. As a user, I would like to sign up, create a profile, and login to my account
    * Implement user signup and login gRPC endpoints.
    * Create user profile and credentials MongoDB schema.
    * Create user signup, profile, and login landing page.
2. As a user, I would like to have my workouts classified and captured using video recognition
    * Setup video recognition to analyze workout video feeds and detect different types of workouts.
    * Integrate the application with third-party APIs such as ML-Kit and Tensorflow.
    * Implement gRPC endpoints to send the captured exercise to the third-party APIs and retrieve the resulting classification. 
    * Show the type of current exercise to the user in real-time.
    * Display the count of each exercise to the user in real-time.
3. As a user, I would like to see a personal fitness report after each of my workouts
    * Create a workout MongoDB schema and fitness report MongoDB schema
    * Implement gRPC endpoints to update and retrieve a user’s workout history, and generate a fitness report based on a user’s workout history.
    * Create a page to view fitness reports.
4. As a user, I would like to create a personal workout playlist
    * Implement gRPC endpoints to edit and save a new set of workout plans, and to retrieve the playlist.
    * Create a MongoDB schema for a user's set of workout plans.
    * Create a page to display the playlist, and allow user to select a particular playlist 
    * When a particular playlist is selected for a workout, then guide the user to complete the playlist. The application will show, in words, what type of exercise needs to be done, the number of repetitions, and what will come up next. 

## Final Version Features

1. As a user, I would like to receive a weekly email detailing my daily (summarized) fitness report
    * Setup nodemailer module to send automated emails to users.
    * Implement an HTML template email to style the emails with CSS.
2. As a user, I would like to know how long I have been working out in a session 
    * Implement a timer and show it directly to the user.
    * Record the total active and passive time. Active time is recorded whenever a user performs an exercise, and passive time is recorded whenever a user does not perform any exercise.
    * Include the recorded time in each fitness report.
3. As a user I would like to see a calendar view of all my previous workouts
    * Create a workout report calendar page
4. As a user, I would like to navigate and explore the web application with an elegant UI
    * Create a home landing page.
    * Create a navigation bar to access different pages.
5. As a user, I would like to logout of my account
    * Create a logout button.
    * Implement gRPC endpoint to log out.

## Technology Stack

**Frontend:** React, Material UI

**Backend:** Node.js, Express.js, gRPC

**Video Recognition:** ML-Kit, Tensorflow

**Database:** MongoDB

## Technical Challenges

1. Setting up video recognition to analyze workout video feeds and detect different types of workouts, using third party APIs.
2. Scaling the application to handle multiple users video feeds with video recognition
3. Ensuring the best user experience on video streaming: high (close to 100%) accuracy of classification, real-time feedback, and low (close to none) buffering. 
4. Designing and integrating all frontend pages to create a professional user experience.
5. Formatting workout report email to look aesthetically pleasing and be user friendly.
