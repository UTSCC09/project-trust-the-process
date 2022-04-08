# project_trust_the_process

## Project URL

https://burnyourcalories.herokuapp.com

## Project Video URL

https://www.youtube.com/watch?v=FV3QHuyrx80

## Project Description

We created a virtual fitness application to accompany users in their workout activities. Users will be able to track the exercises they complete during their workout, and also view a detailed report of their workout diplayed by a visual stepped line graph. The web application was built using real time video streaming and computer vision to detect and classify specific types of exercises. The application then stores this data, so that it can generate a personal fitness report, which users can view in a gallery style reports page. 

## Development

The frontend is built with React and Material-UI. We modularized our frontend by splitting each page into React components, allowing for scalability and easier code maintenance. We used Material-UI for easier styling, and library components such as calendars and buttons. The workout page utilized a webcam feed and audio detection to record a user's workout, so we integrated the built in JavaScript webcam API and a React library for speech recognition. For the computer vision exercise classification we used a third party Google Pose Detection machine learning model, and deployed on Google Teachable Machine. In our reports page we used an extened React library called Victory for data visualization. This allowed us to generate a stepped line graph for each report. The frontend uses Apollo client to make requests to the backend GraphQL API and sends a JWT token that is stored in localStorage as a header for authentification.

The backend is a GraphQL API built with Node.js, Express.js, and Apollo. It consists of 3 schemas, users, exercises, and reports. The users schema includes 2 GraphQL mutations for register and login. The exercises schema includes 2 GraphQL mutations for adding an exercise and getting an exercise. The reports schema includes 5 GraphQl mutations, 2 are used when creating a report from the frontend workout page, and the other 3 are used when reading and displaying reports in the frontend reports page. The reason we have 3 GraphQL mutations for our reports display, is so that we can use lazy loading to improve server performance and save reources. The backend authenticates requests with JWT, to ensure that requests are being made purely from the app.

The backend communicates with a MongoDB database, that consists of 3 different models(Object Types), user, report, and exercise. Each object type has a field that references the Id of another object type, allowing our NoSQL database to have relations between all 3 models. For example, a Report object has a userId field that allows a report to belong to a User, and it also has an exercises array that has a list of exerciseIds that belong to the Report.

## Deployment

We deployed our application on Heroku using their Hobby dyno to avoid down time and server idles. We setup a package.json in the root of our repository to install npm packages for both the backend and frontend, and then build the frontend. However we modified the frontend build script to move the build folder to the backend. This allowed us to serve the frontend build files in the backend as a static folder using Express. We then added a line in our root package.json to run the the backend using npm. This line is executed every time the server is booted up or restarts. Finally we added our MongoDB URI to the Heroku project's config variables, to allow the deployed application to use the database.

## Maintenance

We monitor our app on Heroku using the Heroku Metrics section. This section displays specific analytics over the past 24 hours, such as memory usage and response time. The memory usage metric shows us how much memory the application uses at every minute over the last 24 hours. If the memory usage remains non-zero throughout the 24 hour period, this shows us that the application did not crash. The response time metric shows us every time a user visited the application in the last 24 hours.

## Challenges

1. Understanding how the HTMLMediaElement works and how to utilize it to set up the webcam for our project. Furthermore, since we have decided to use NPM packages for setting up the webcam and speech recognition, we have faced several issues in getting the components to work as intended due to the lack of documentation. 

2. Creating a functional, interactive and seemless reports page, that shows what dates users have reports for in the calendar and then being able to generate the reports for a day when selected/inputted on the calendar itself. Dealing with passing around information between different levels of components and making sure this caused no delays in rendering made this task faily challenging yet rewarding, as it helped build our understanding about DOM and React.

3. Deploying our application on Heroku was challenging as all 3 of us had no experience with web application deployment, and we also had fears that our video and speech recognition would suffer performance drop offs over a public server. To serve our frontend statically to the backend we were required to integrate express into our Apollo server. This forced us to migrate our Apollo server from apollo-server to apollo-server-express.

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
2. Designed and implemented the backend GraphQL API for creating and reading workout reports (reports and exercises)
3. Implemented JWT authentification and input validation/sanitization for backend security
4. Designed and implemented the Live Statistics React component for the Workout page
5. Deployed project on Heroku
6. Created project demo video

# One more thing? 

You can start the workout session / webcam by saying "Start" and you can stop it by saying "Stop"
