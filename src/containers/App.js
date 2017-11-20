import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import HeaderArea from './HeaderArea';
import BodyArea from './BodyArea';


const demoUrl = 'https://play.dhis2.org/demo/api';
export var baseUrl;

class App extends React.Component {

  constructor() {
    super();
    this.readyBaseUrl = false;
  }

  getBasePath() {
    fetch('./manifest.webapp', 
    {
      credentials: "include"
    })
    .then((resp) => resp.json())
    .then((data) => {
      let url = data.activities.dhis.href;
      if (url === '*') {
        baseUrl = demoUrl;      
      } else {
        baseUrl = url + '/api';
      }
      this.readyBaseUrl = true;
      console.log('baseUrl is set to:' + baseUrl);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.getBasePath();
    console.log('debug2');
  }


  render() {
    console.log('debug3');
    return (
      <div>
        <HeaderArea/>
        <BodyArea />
      </div>
    );
  }
}

export default App;