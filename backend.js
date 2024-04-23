import express from 'express';
import bodyParser from 'body-parser';


const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/User/:username', (req, res) => {
    // /User/:username?password=1234
    // Replace with your code
    //check username and password
    //if correct, send json of login info
    //if wrong 400
    return {
        name : "Student",
        Courses: [course: {
            name: "COMP 426",
            grade: 95,
            gradeLetter: "A",
            creditHours: 3,

        }],
        GPA: 3.5,
        
    }
    //name
    //courses
    //grades
    //logout

});


app.post('/User', (req, res) => {
    // add user
});

app.put('/User/:username', (req, res) => {
    // /User/:username?password=1234
    
});

app.delete('/User/:username', (req, res) => {
    // /User/:username?password=1234
    
});




app.listen(port, () => {
    console.log('Running...');
})