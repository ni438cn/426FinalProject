import express from 'express';
import bodyParser from 'body-parser';
import {Users} from './users.mjs';
import {Teachers} from './teachers.mjs';
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




app.listen(port, () => {
    console.log('Running...');
})