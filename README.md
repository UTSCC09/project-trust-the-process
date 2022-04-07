# project_trust_the_process

## Project URL

https://burnyourcalories.herokuapp.com

## Project Video URL

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

**Task:** Provide a detailed description of your app

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

## Deployment

We deployed our application on Heroku using their Hobby dyno to avoid down time and server idles. We setup a package.json in the root of our repository to install npm packages for both the backend and frontend, and then build the frontend. However we modified the frontend build script to move the build folder to the backend. This allowed us to serve the frontend build files in the backend as a static folder using Express. We then added a line in our root package.json to run the the backend using npm. This line is executed every time the server is booted up or restarts. Finally we added our MongoDB URI to the Heroku project's config variables, to allow the deployed application to use the database.

## Maintenance

We monitor our app on Heroku using the Heroku Metrics section. This section displays specific analytics over the past 24 hours, such as memory usage and response time. The memory usage metric shows us how much memory the application uses at every minute over the last 24 hours. If the memory usage remains non-zero throughout the 24 hour period, this shows us that the application did not crash. The response time metric shows us every time a user visited the application in the last 24 hours.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. Video and Speech recognition challenge
2. Reports page challenge
3. Deployment challenge

## Contributions

### Steven Hans Limantoro
1. Backend server setup
2. Sign up and sign in (backend)
3. Webcam, video recognition, speech recognition, data visualization for report (frontend)
4. Integration between video (frontend) and report (backend) 
5. Machine learning model training 

### Prashanth Ketheeswaran
1. Designed and implemented frontend portion of Signin and Signup
2. Designed and implemented Dashboard
3. Designed and implemented Navbar that allows user to go to Dashboard or Signout
4. Added React Router and Auth (to be able to access pages only once signed in) to web application
5. Designed and implemented Reports page, including interactions with calendar and list of reports
6. Combined and organized components built by group members for Workout page

### Vignesh Nanthakumar
1. Designed and implemented MongoDB mongoose models for User, Report, and Exercise
2. Designed and implemented the backend GraphQL API for creating and reading workout reports (7 GraphQL mutations, reports schema, and exercises schema)
3. Implemented JWT authentification and input validation/sanitization for backend security
4. Designed and implemented the Live Statistics React component for the Workout page
5. Deployed project on Heroku
6. Created project demo video

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
