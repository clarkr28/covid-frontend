import React from 'react';
import './App.scss';
import Body from './components/Body';

function App() {
  /*
  axios
    .get('http://localhost:5000/groundhog/v1/state/Minnesota')
    .then(function (response: any) {
      // handle success
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error)
    })
    */

  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID-19 Data</h1>
      </header>
      <Body/>
    </div>
  );
}

export default App;
