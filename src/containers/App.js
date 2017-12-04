import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {getBaseUrl} from '../components/BaseUrl';
import {loadOrgUnits, loadQuery} from '../components/LoadOrgUnits';
import {default as Spinner} from 'react-loader';
import HeaderArea from './HeaderArea';
import TreeArea from './TreeArea';
import InfoSheetArea from './InfoSheetArea';
import MapArea from './MapArea';
import AdminArea from './AdminArea'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      isUrlReady: false,
      isAllUnitsReady: false,
      allUnits: [],                   // array of json objs  [{{name: },{id:},{children:},{featureType:},{coordinates:}},...]
      levelOne: [],                   // array of json objs
      selectedOrg: null,              // a json obj
      searchSet: [],
      visibleAreas: {tree: true, info: true, map: true},
    };
  }

  async componentDidMount() {
    await getBaseUrl;
    this.setState({isUrlReady: true});
    let allUnits = await loadOrgUnits();
    let levelOne = await loadQuery('organisationUnits.json?paging=false&level=1&fields=id');
    this.setState({
      allUnits: allUnits.organisationUnits,
      levelOne: levelOne.organisationUnits,
      isAllUnitsReady: true,
    });
  }

  handlNewSearchSet(list) {
    this.setState({searchSet: list});
  }

  handlNewSelectedOrgId(newId) {
    let newSelectedObj = this.state.allUnits.find((org) => {return org.id === newId});
    this.setState({selectedOrg: newSelectedObj})
  }

  renderHeader() {
    return (
      <HeaderArea
        allUnits={this.state.allUnits}
        visibleAreas={this.state.visibleAreas}
        handlNewSearchSet={this.handlNewSearchSet.bind(this)}/>
    )
  }

  renderLoading() {
    return (
      <div>
        <div>
          <Spinner loaded={this.state.isAllUnitsReady} top="20%" left="50%"/>
        </div>
        <div>
          <center> Downloading data from the server...</center>
        </div>
      </div>
    );
  }

  renderMain() {
    let treeArea = <TreeArea
      allUnits={this.state.allUnits}
      levelOne={this.state.levelOne}
      selectedOrg={this.state.selectedOrg}
      searchSet={this.state.searchSet}
      passNewSelectedOrgId={this.handlNewSelectedOrgId.bind(this)}
    />;
    let infoArea = <InfoSheetArea
      selectedOrg={this.state.selectedOrg}
    />;
    let mapArea = <MapArea
      selectedOrg={this.state.selectedOrg}
      allUnits={this.state.allUnits}
      levelOne={this.state.levelOne}
      searchSet={this.state.searchSet}/>;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={3} md={2}>
              {this.state.visibleAreas.tree ? treeArea : null}
            </Col>
            <Col xs={9} md={5}>
              {this.state.visibleAreas.info ? infoArea : null}
            </Col>
            <Col xs={6} md={5}>
              {this.state.visibleAreas.map ? mapArea : null}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  render() {
    return (
        <div>
          {this.state.isUrlReady ? this.renderHeader() : null}
          <div>{this.state.isAllUnitsReady ? this.renderMain() : this.renderLoading()}</div>
        </div>
    );
  }
}

export default class App extends React.Component{
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Main} />
          <Route path="/admin" component={AdminArea}/>
        </div>
      </Router>
    );
  }
}