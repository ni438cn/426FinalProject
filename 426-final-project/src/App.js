import './App.css';

function App() {
  return (
    <div className="App">
      <h1>COMP426 Final Project</h1>
      <div class="input-container">
        <input class="input" type="text" id="username" placeholder="Username"></input>
        <input class="input" type="password" id="password" placeholder="Password"></input>
      </div>
      <div class="button-container">
        <button class="button">Register</button>
        <button class="button">Sign In</button>
      </div>
    </div>
  );
}

export default App;
