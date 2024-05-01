import express from 'express';
import bodyParser from 'body-parser';
import {Users} from './users.mjs';
import {Teachers} from './teachers.mjs';
import {google} from 'googleapis';
import cors from "cors";

//const cors = require('cors');

const app = express();

const port = 4000;
app.use(cors());
app.use(bodyParser.json());

app.get('/Users', (req, res) => {
    res.json(Users.getAll());
});

app.get('/User/:username', (req, res) => {
    // /User/:username?password=1234
    // Replace with your code
    //check username and password
    //if correct, send json of login info
    //if wrong 400
    let username = req.params.username;
    let password = req.query.password;
    let user = Users.find(username, password);
    if (! user) {
        res.status(404).send("wrong password/username");
        return;
    }
    res.json(user.json());

/*    return {
        name : "Student",
        Courses: [ {
            name: "COMP 426",
            grade: 95,
            gradeLetter: "A",
            creditHours: 3,

        }],
        GPA: 3.5,

    }
    //name
    //courses
    //grades*/


});


app.post('/User', (req, res) => {
    console.log(req);
    let user = Users.create(req.body);
    if (!user) {
        res.status(400).send("Bad request");
        return;
    }
    res.status(201).json(user.json());
});

app.put('/User/:username', (req, res) => {
    let username = req.params.username;
    let password = req.query.password;
    let user = Users.find(username, password);
    if (! user) {
        res.status(404).send("wrong password/username");
        return;
    }
    //console.log(req.body);
    if ((!req.body instanceof Object) || (req.body.username == undefined) || (req.body.password == undefined) || (req.body.name == undefined) ) {
        res.status(400).send("Bad request");
        return;
    }

    user.setUsername(req.body.username);
    user.setPassword(req.body.password);
    //user.setCourses(req.body.Courses);
    user.setName(req.body.name);
    res.json(user.json());
    // /User/:username?password=1234
    
});

app.delete('/User/:username', (req, res) => {
    console.log("here");
    let username = req.params.username;
    let password = req.query.password;
    let user = Users.find(username, password);
    if (! user) {
        res.status(404).send("wrong password/username");
        return;
    }
    user.delete();
    res.status(201).json(user.json());
    return;
    
});
//Teacher
app.get('/Teach/:username', (req, res) => {
    // /User/:username?password=1234
    // Replace with your code
    //check username and password
    //if correct, send json of login info
    //if wrong 400
    let username = req.params.username;
    let password = req.query.password;
    let user = Teachers.find(username, password);
    if (! user) {
        res.status(404).send("wrong password/username");
        return;
    }
    res.json(user.json());

/*    return {
        name : "Teacher",
        Courses: [ {
            name: "COMP 426",
            students: [{
            name: "student",
            username: "student",
            grade: 95,
            gradeLetter: "A"}],
            creditHours: 3,

        }],

    }
    //name
    //courses
    //grades*/


});


app.post('/Teach', (req, res) => {
    console.log(req);
    let user = Teachers.create(req.body);
    if (!user) {
        res.status(400).send("Bad request");
        return;
    }
    res.status(201).json(user.json());
});

app.put('/Teach/:username', (req, res) => {
    let username = req.params.username;
    let password = req.query.password;
    let user = Teachers.find(username, password);
    if (! user) {
        res.status(404).send("wrong password/username");
        return;
    }
    //console.log(req.body);
    if ((!req.body instanceof Object) || (req.body.username == undefined) || (req.body.password == undefined) || (req.body.name == undefined) || (req.body.Courses == undefined)) {
        res.status(400).send("Bad request");
        return;
    }

    user.setUsername(req.body.username);
    user.setPassword(req.body.password);
    user.setCourses(req.body.Courses);
    user.setName(req.body.name);
    res.json(user.json());
    // /User/:username?password=1234
    
});

app.delete('/Teach/:username', (req, res) => {
    console.log("here");
    let username = req.params.username;
    let password = req.query.password;
    let user = Teachers.find(username, password);
    if (! user) {
        res.status(404).send("wrong password/username");
        return;
    }
    user.delete();
    res.status(201).json(user.json());
    return;
    
});


const oauth2Client = new google.auth.OAuth2(
    '50054025738-581vf50hf8tomrgrd4394nk4oai4seoi.apps.googleusercontent.com',
    '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',
    'http://localhost:4000/oauth2callback' 
);

  google.options({auth: oauth2Client });

  app.get('/auth/google', (req, res) => {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
    res.redirect(url);
  });

  app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
      calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }, (err, response) => {
        if (err) {
          console.error('Error fetching calendar data:', err);
          res.status(500).send('Error fetching calendar data');
          return;
        }
        const events = response.data.items;
        res.json({ events });
      });
    } catch (error) {
      console.error('Error obtaining access tokens:', error);
      res.status(500).send('Authentication failed');
    }
    res.redirect('http://localhost:3000/calendar');
  });
  

  app.get('/calendar/events', async (req, res) => {
    try {
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10, 
        singleEvents: true,
        orderBy: 'startTime',
      });
      const events = response.data.items;
      res.json(events);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      res.status(500).send('Error fetching calendar events');
    }
  });


app.listen(port, () => {
    console.log('Running...');
})