import React from 'react';
import {local, prepBaseUrl, url} from "../globals/BaseUrl";
import {prepUserInfo} from '../globals/UserInfo';
import MainPage from './MainPage';
import AdminPage from './AdminPage';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await prepBaseUrl();
    await prepUserInfo();
    this.setState({
      isReady: true,
    });
  }
  

  renderRouter() {

    return(
      <Router>
        <div>
          <Route exact path={(!local && url+"/index.html") || "/"}>
            <div>
              <Route path="" component={MainPage}/>
              {/*<Route path={"/admin"} component={AdminPage}/>*/}
              <Route path={"/admin/:orgID"} component={AdminPage} />
            </div>
          </Route>
        </div>
    </Router>
    );
  }

  render() {
    return (
      <div>
        {this.state.isReady ? this.renderRouter() : null}
      </div>
    );
  }
}

