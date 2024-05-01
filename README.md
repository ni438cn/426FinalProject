# Getting Started with GradeTracker App

This project was made with a React front-end and an Express backend with Google Calender API.

Project built by Nicholas Boyer, Mugheera Basharat, Connor Goodwin

# Overview of GradeTracker

- Students can register and login to see their grades.

- Teachers can register and login to write their grades for their class for each student.

- On the frontend, the user is able to sign in to their account or register a new account.
    - A Student role is able to:
         1. View GPA
         2. View their current courses and grades for each course
    - A Teacher role is able to:
         1. View their courses they teach and the students in those courses along with each student's grade
         2. Add a course to their courses that they teach
         3. Update the grades of their students in each course

- On the backend, all of our user and course information is stored in our database.
    - Student information
    - Teacher information
    - Course information
    - Grade information
    
- Our frontend communicates to our backend through the following API calls:
    - GET    -> gets all Student users to authorize a registered Student account
    - GET    -> gets all Teacher users to authorize a registered Teacher account
    - GET    -> calls to Google's API to authorize the user account to access built-in calendar

    - POST   -> creates a new registered Student account
    - POST   -> creates a new registered Teacher account

    - PUT    -> updates a user account's information (name, username, password)
    - PUT    -> updates a teacher's taught courses
    - PUT    -> updates a student's grade for a specified course
  

- See this video to learn more: [https://youtu.be/UxgUrYMD_jU](https://youtu.be/UxgUrYMD_jU)


## Available Scripts

In the final project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Also run `backend.mjs` for the backend server (localhost:4000).

