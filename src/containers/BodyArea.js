import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tree from './Tree';
import {loadOrgUnits} from '../components/LoadOrgUnits';
import {default as Spinner} from 'react-loader';
// import Spinner from 'react-spinner';
// import "react-spinner/react-spinner.css";


export default class BodyArea extends React.Component {

  constructor() {
    super();
    this.state = {
      tree: '',
      isTreeReady: false,
    }
  }

  async componentDidMount() {
    let tree = await loadOrgUnits();
    this.setState({
      tree: tree,
      isTreeReady: true,
    })
  }

  treeReady() {
    return (
      <Tree tree={this.state.tree}/>
    );
  }

  treeLoading() {
    return(
      <div>
        <div>
          <Spinner loaded={this.state.isTreeReady} top="80%" left="50%"/>
        </div>
        <div>
          <p> Downloading data from server...</p>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div>
        <Grid>
          <Row>
            <Col xs={6} md={4}>
              {/* {this.state.isTreeReady ? this.treeReady() : this.treeLoading()}              */}
            </Col>
            <Col xs={6} md={4}>
              <div>
              </div>
            </Col>
          </Row>
        </Grid>        
      </div>
    );
  }
}