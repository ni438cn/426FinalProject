import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './RegisterPage';

function App() {
  async function eventHandler() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let jsonPost = {
        name: username,
        username : username,
        password: password,
        Courses : []
      }
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

      fetch("http://localhost:4000/User", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

  }
  return (
    <Router>
      <div className="App">
        <h1>COMP426 Final Project</h1>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={
            <div>
              <div className="input-container">
                <input className="input" type="text" id="username" placeholder="Username"></input>
                <input className="input" type="password" id="password" placeholder="Password"></input>
              </div>
              <div className="button-container">
                <button className="button">Sign In</button>
              </div>
              <div className="register-container">
                <p>Don't have an account? <a href="/register">Register</a></p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
