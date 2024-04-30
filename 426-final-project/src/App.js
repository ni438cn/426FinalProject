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
      <p>Courses: {JSON.stringify(gl.Courses)}</p>
      <input className="input" type="text" id="username" placeholder="Current Username"></input>
      <input className="input" type="password" id="password" placeholder="Current Password"></input>
      <input className="input" type="password" id="new password" placeholder="New Password"></input>
      <input className="input" type="text" id="name" placeholder="New name"></input>
      <div>
            <button className="button" onClick={eventHandler2}>Reset</button>
      </div>
    </div>
  );
}

function TeachPage() {
  async function eventHandler3() {
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
     
      <p>Courses: {JSON.stringify(gl.Courses)}</p>
      <input className="input" type="text" id="username" placeholder="Current Username"></input>
      <input className="input" type="password" id="password" placeholder="Current Password"></input>
      <input className="input" type="password" id="new password" placeholder="New Password"></input>
      <input className="input" type="text" id="name" placeholder="New name"></input>
      <div>
            <button className="button" onClick={eventHandler3}>Reset</button>
      </div>
    </div>
  );
}

export default App;