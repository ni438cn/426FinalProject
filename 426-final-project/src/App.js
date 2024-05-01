import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';


let gl;

function App() {
  
  return (
    <Router>
      <div className="App">
        <h1>COMP426 Final Project</h1>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/teach/:username" element={<TeachPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function SignInPage() {
  const navigate = useNavigate();
  

  async function eventHandler() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    /*const raw = JSON.stringify({
      "name": username,
      "username": username,
      "password": password,
      "Courses": []
    });*/

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      //body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:4000/User/" +username + "?password=" + password, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        result = JSON.parse(result);
        if (result.name != undefined) {
          navigate(`/user/${username}`);
          gl = result;
          return;
          
        } else {
          console.log("User student not found or invalid credentials");
        }
      })
      .catch((error) => console.error(error));
  
  fetch("http://localhost:4000/Teach/" +username + "?password=" + password, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        result = JSON.parse(result);
        if (result.name != undefined) {
          navigate(`/teach/${username}`);
          gl = result;
          return;
        } else {
          console.log("User teacher not found or invalid credentials");
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <div className="input-container">
        <input className="input" type="text" id="username" placeholder="Username"></input>
        <input className="input" type="password" id="password" placeholder="Password"></input>
      </div>
      <div className="button-container">
        <button className="button" onClick={eventHandler}>Sign In</button>
      </div>
      <div className="register-container">
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  async function eventHandler1() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let type = document.getElementById("user-type").value;
    //console.log(type);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": username,
      "username": username,
      "password": password,
      "Courses": []
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    if (type == "student") {
        fetch("http://localhost:4000/User", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          result = JSON.parse(result);
          if (result.name != undefined) {
            navigate(`/user/${username}`);
            gl = result;
          } else {
            console.log("User not found or invalid credentials");
          }
        })
        .catch((error) => console.error(error));
      }

    
    if (type == "teacher") {
      fetch("http://localhost:4000/Teach", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        result = JSON.parse(result);
        if (result.name != undefined) {
          navigate(`/teach/${username}`);
          gl = result;
        } else {
          console.log("User not found or invalid credentials");
        }
      })
      .catch((error) => console.error(error));
    };

  }
    
  return (
    <div className="registration-page">
      <h2>Registration Page</h2>
      <div class="input-container">
        <input className="input" type="text" id="username" placeholder="Username"></input>
        <input className="input" type="password" id="password" placeholder="Password"></input>
    <div className="custom-select">
        <select className="select" id="user-type">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        </select>
        <span className="select-arrow">&#9662;</span>
        </div>
            <button className="button" onClick={eventHandler1}>Register</button>
        </div>
        <div>
            <button className="button">Back</button>
        </div>
    </div>
  );
}

function UserPage() {
  const navigate = useNavigate();
  function signOut() {
    gl= null;
    navigate("/");
  }
  async function eventHandler2() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let npassword = document.getElementById("new password").value;
      let name = document.getElementById("name").value;

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "name": name,
        "username": username,
        "password": npassword
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:4000/User/" +username + "?password=" + password, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          result = JSON.parse(result);
          if (result.name != undefined) {
            console.log("success!");
            navigate(`/user/${username}`);
          } else {
            console.log("User not found or invalid credentials");
            alert("Failed to reset")
          }
        })
        .catch((error) => console.error(error));
    }
  
  return (
    <div>
      <h1>Student Name : {gl.name}</h1>
      <p>GPA : {gl.GPA}</p>
      <p>Courses:</p>
      <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Credit Hours</th>
            <th>Grade</th>
            <th>Grade Letter</th>
          </tr>
        </thead>
        <tbody>
          {gl.Courses.map((course, index) => (
            <tr key={index}>
              <td>{course.name}</td>
              <td>{course.creditHours}</td>
              <td>{course.grade}</td>
              <td>{course.gradeLetter}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <input className="input" type="text" id="username" placeholder="Current Username"></input>
      <input className="input" type="password" id="password" placeholder="Current Password"></input>
      <input className="input" type="password" id="new password" placeholder="New Password"></input>
      <input className="input" type="text" id="name" placeholder="New name"></input>
      <div>
            <button className="button" onClick={eventHandler2}>Reset</button>
      </div>
      <div>
            <button className="button" onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}

function TeachPage() {
  const navigate = useNavigate();
  function signOut() {
    gl= null;
    navigate("/");
  }
  async function eventHandler4() {
    let adder = document.getElementById("adder");
    let a = document.createElement("input");
    a.placeholder = "Course Name";
    a.id = "Course Name";
    adder.append(a);
    let b = document.createElement("input");
    b.placeholder = "Credit Hours";
    b.id = "Credit Hours";
    adder.append(b);
    let options;
    await fetch("http://localhost:4000/Users")
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      options = JSON.parse(result).users;
      console.log(options);
    })
    .catch((error) => console.error(error));
    let c = document.createElement("select");
    c.textContent = "Choose Students:";
    c.multiple = true;
    let d = document.createElement("button");
    d.className = "button";
    d.textContent = "Added Course";
    
    d.addEventListener("click", () => {
      console.log(c.selectedOptions);
      let students = [];
      let so = c.selectedOptions;
      for (let i=0; i < so.length; i++) {

        let n = so[i];
        //console.log(n);
        let name = n.label;
        let username = n.attributes.value.nodeValue;
        let grade = 0;
        let gradeLetter = 0;
        students.push({
          name: name,
          username: username,
          grade: grade,
          gradeLetter: gradeLetter
        });
      };
      let cname = a.value;
      let ch = b.value;
      gl.Courses.push({
        name: cname,
        creditHours: ch,
        students: students
      });

    });

    
    //c.setAttribute("multiple");

    c.id = "Students";
    console.log(options);
    options.forEach((e) => {
      let o = document.createElement("option");
      o.textContent = e.name;
      o.value = e.user;
      c.append(o);
    });
    adder.append(c);
    adder.append(d);


    /*

        Courses: [ {
            name: "COMP 426",
            students: [{
            name: "student",
            username: "student",
            grade: 95,
            gradeLetter: "A"}],
            creditHours: 3,

        }],
    */

  }
  async function eventHandler3() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let npassword = document.getElementById("new password").value;
      let name = document.getElementById("name").value;

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      try {

      
      gl.Courses.forEach( c => {
        c.students.forEach(s => {
          s.grade = document.getElementById(s.username+c.name+'1').value;
          s.gradeLetter = document.getElementById(s.username+c.name+'2').value;
          console.log(s.grade);
        })
      });
      } catch{};


      const raw = JSON.stringify({
        "name": name,
        "username": username,
        "password": npassword,
        "Courses": gl.Courses
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:4000/Teach/" +username + "?password=" + password, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          result = JSON.parse(result);
          if (result.name != undefined) {
            console.log("success!");
            navigate(`/teach/${username}`);
          } else {
            console.log("User not found or invalid credentials");
            alert("Failed to reset")
          }
        })
        .catch((error) => console.error(error));
    }
  
  return (
    <div>
      <h1>Teacher Name : {gl.name}</h1>
     
      <p>Courses:</p>
      <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Credit Hours</th>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          {gl.Courses.map((course, index) => (
            <tr key={index}>
              <td>{course.name}</td>
              <td>{course.creditHours}</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Student Username</th>
                      <th>Grade</th>
                      <th>Grade Letter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.students.map((student, studentIndex) => (
                      <tr key={studentIndex}>
                        <td>{student.name}</td>
                        <td>{student.username}</td>
                        <td><input type="text" id={student.username + course.name + '1'} placeholder={student.grade}></input></td>
                        <td><input type="text" id={student.username + course.name + '2'} placeholder={student.gradeLetter}></input></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div id="adder"></div>
      <button className="button" onClick={eventHandler4}>Add Course</button>
      <div>
      <input className="input" type="text" id="username" placeholder="Current Username"></input>
      <input className="input" type="password" id="password" placeholder="Current Password"></input>
      <input className="input" type="password" id="new password" placeholder="New Password"></input>
      <input className="input" type="text" id="name" placeholder="New name"></input>
      </div>
      
      <div>
            <button className="button" onClick={eventHandler3}>Reset/Save</button>
      </div>
      <div>
            <button className="button" onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;