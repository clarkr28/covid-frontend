import React from 'react';
import logo from './logo.svg';
import './App.scss';

function App() {
  const axios = require('axios').default;
  axios.get('localhost:5000/')
    .then(function (response: any) {
      // handle success
      console.log(response);
    })
    .catch(function (error: any) {
      // handle error 
      console.log(error);
    })
    .finally(function () {
      // always executed
      console.log('finally...');
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
