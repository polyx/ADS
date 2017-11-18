import React, { Component } from 'react';
import './App.css';
import LoadDataElements from './FetchElemsExample';

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