import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import CalendarPage from './CalendarPage';
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
          <Route path="/auth/google" element={<GoogleAuth />} />
          <Route path="/calendar" element={<CalendarPage />} />
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
    let requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      redirect: 'follow'
    };

    fetch(`http://localhost:4000/User/${username}?password=${password}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result === "success") {
          navigate(`/user/${username}`);
        } else {
          console.log("User not found or invalid credentials");
        }
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div>
      <div className="input-container">
        <input className="input" type="text" id="username" placeholder="Username" />
        <input className="input" type="password" id="password" placeholder="Password" />
      </div>
      <div className="button-container">
        <button className="button" onClick={eventHandler}>Sign In</button>
      </div>
      <div className="register-container">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
      <div>
        <button onClick={() => window.location.href = 'http://localhost:4000/auth/google'}>Sign in with Google</button>
      </div>
    </div>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  async function eventHandler1() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "Courses": []
      }),
      redirect: 'follow'
    };

    fetch("http://localhost:4000/User", requestOptions)
      .then(response => response.text())
      .then(result => {
        const data = JSON.parse(result);
        if (data.name) {
          navigate(`/user/${username}`);
        } else {
          console.log("User not found or invalid credentials");
        }
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className="registration-page">
      <h2>Registration Page</h2>
      <div className="input-container">
        <input className="input" type="text" id="username" placeholder="Username" />
        <input className="input" type="password" id="password" placeholder="Password" />
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
        <button className="button" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

function UserPage() {
  const navigate = useNavigate();
  const username = window.location.pathname.split('/')[2];
  return (
    <div>
      <h1>Welcome, {username}</h1>
      <button onClick={() => navigate('/calendar')}>View Calendar</button>
    </div>
  );
}


function GoogleAuth() {
  return <div>Authenticating with Google</div>;
}

export default App;
