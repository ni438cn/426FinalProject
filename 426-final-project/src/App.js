import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>COMP426 Final Project</h1>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user/:username" element={<UserPage />} />
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

    const raw = JSON.stringify({
      "name": username,
      "username": username,
      "password": password,
      "Courses": []
    });

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:4000/User", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === "success") {
          navigate(`/user/${username}`);
        } else {
          console.log("User not found or invalid credentials");
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
            <button className="button">Register</button>
        </div>
        <div>
            <button className="button">Back</button>
        </div>
    </div>
  );
}

function UserPage() {
  return (
    <div></div>
  );
}

export default App;