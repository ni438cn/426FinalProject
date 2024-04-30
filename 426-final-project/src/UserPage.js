import React from 'react';
import './App.css';
import App from './App.js';

function UserPage() {
  async function eventHandler2() {
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
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:4000/User/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

  }
  console.log(window.data);

  return (
    <div className="registration-page">
      <h2>Registration Page</h2>
      
    </div>
  );
}

export default UserPage;