import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {getBaseUrl} from '../components/BaseUrl';
import {loadOrgUnits} from '../components/LoadOrgUnits';
import {default as Spinner} from 'react-loader';
import HeaderArea from './HeaderArea';
import TreeArea from './TreeArea';
import InfoSheetArea from './InfoSheetArea';
import MapArea from './MapArea';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isUrlReady: false,
      isTreeReady: false,
      tree: '',
      selectedOrgId: '',
      searchRes: [],
      visibleAreas: {tree: true, info: true, map: true},
    };
  }

  async componentDidMount() {
    await getBaseUrl;
    this.setState({isUrlReady: true});
    let tree = await loadOrgUnits();
    this.setState({
      tree: tree,
      isTreeReady: true,
    });
  }

  handleSearchRes(list) {    
    console.log(list);
    console.log(this.state.searchRes);
    this.setState({searchRes: ['a']});
    console.log(this.state.searchRes);
  }

  renderHeader() {
    return( 
      <HeaderArea 
        tree={this.state.tree}
        visibleAreas={this.state.visibleAreas}
        processSearchRes={this.handleSearchRes.bind(this)}/>
    )
  }

  renderLoading() {
    return(
      <div>
        <div>
          <Spinner loaded={this.state.isTreeReady} top="20%" left="50%"/>
        </div>
        <div>
          <center> Downloading data from the server...</center>
        </div>
      </div>
    );
  }

  renderMain() {
    let treeArea = <TreeArea 
      tree={this.state.tree}
      searchRes={this.props.searchRes}
      />;
    let infoArea = <InfoSheetArea tree={this.state.tree} />;
    let mapArea = <MapArea tree={this.state.tree}/>;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={3} md={2}>
              {this.state.visibleAreas.tree ? treeArea : null}
            </Col>
            <Col xs={9} md={5}>
              {this.state.visibleAreas.tree ? infoArea : null}
            </Col>
            <Col xs={6} md={5}>
              {this.state.visibleAreas.tree ? mapArea : null}
            </Col>
          </Row>
        </Grid> 
      </div>
    );
  }

  render() {
    return(
      <div>
        {this.state.isUrlReady ? this.renderHeader() : null}
        {this.state.isTreeReady ? this.renderMain() : this.renderLoading()}
      </div> 
    );
  }
}