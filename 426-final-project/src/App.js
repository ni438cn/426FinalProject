import './App.css';

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
    <div className="App">
      <h1>COMP426 Final Project</h1>
      <div class="input-container">
        <input class="input" type="text" id="username" placeholder="Username"></input>
        <input class="input" type="password" id="password" placeholder="Password"></input>
      </div>
      <div class="button-container">
        <button class="button" onClick={eventHandler}>Register</button>
        <button class="button" >Sign In</button>
      </div>
    </div>
  );
}

export default App;
