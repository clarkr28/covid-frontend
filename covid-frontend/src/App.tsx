import React from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';

function App() {
  //const axios = require('axios').default;
  //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  /**
  axios.get('http://localhost:5000/')
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
    });*/
  // let instance = axios.create({baseURL: 'http://localhost:5000'});
  axios
    .get('http://localhost:5000/')
    .then(function (response: any) {
      // handle success
      console.log(response);
    })

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
