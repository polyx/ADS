import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import LoadDataElements from './FetchElemsExample';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

//const baseUrl = 'http://localhost:8080/dhis/api';
const demoUrl = 'https://play.dhis2.org/demo/api';
export var baseUrl;

function getBasePath() {
    return fetch('./manifest.webapp', 
    {
      credentials: "include"
    })
    .then((resp) => resp.json())
    .then((data) => {
      return data.activities.dhis.href;
    })
    .catch((err) => {
      console.log(err);
    });
  
}


function App() {
  getBasePath().then(url => {
    if (url === '*') {
      baseUrl = demoUrl;      
    } else {
      baseUrl = url + '/api';
    }
    console.log('baseUrl is set to ' + baseUrl);
    LoadDataElements();
  })
  
}

export default App;