import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import HeaderArea from './HeaderArea';
import BodyArea from './BodyArea';
import {getBaseUrl} from '../components/BaseUrl';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {isUrlReady: false};
  }

  async componentDidMount() {
    await getBaseUrl;
    this.setState({isUrlReady: true})
  }

  mainRender (){
    return(
      <div>
        <HeaderArea/>
        <BodyArea/>
      </div>
    );
  }

  loadingRender() {
    return(
      <p>Loading...</p>
    );
  }

  render() {
    return(
      <div>
        {this.state.isUrlReady ? this.mainRender() : this.loadingRender()}
      </div>
    );
    
  }
}