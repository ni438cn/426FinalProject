import React from 'react';
import './App.css';

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

export default RegisterPage;