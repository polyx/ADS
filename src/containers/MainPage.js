import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {loadOrgUnits, loadQuery} from '../api';
import {default as Spinner} from 'react-loader';
import HeaderArea from './HeaderArea';
import SearchArea from './SearchArea';
import InfoSheetArea from './InfoSheetArea';
import MapArea from './MapArea';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


export default class MainPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isAllUnitsReady: false,
      allUnits: [],                   // array of json objs  [{{name: },{id:},{children:},{featureType:},{coordinates:}},...]
      levelOne: [],                   // array of json objs
      selectedOrg: null,              // json obj
      searchSet: [],
      visibleAreas: {tree: true, info: true, map: true},
      isUserAdmin: props.isUserAdmin,
    };
  }

  async componentDidMount() {
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
    //console.log("handlNewSelectedOrgId " + newId);
    let newSelectedObj = this.state.allUnits.find((org) => {return org.id === newId});
    this.setState({selectedOrg: newSelectedObj});
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
    let searchArea = <SearchArea
      allUnits={this.state.allUnits}
      levelOne={this.state.levelOne}
      selectedOrg={this.state.selectedOrg}
      searchSet={this.state.searchSet}
      handlNewSelectedOrgId={this.handlNewSelectedOrgId.bind(this)}
    />;
    let infoArea = <InfoSheetArea
      selectedOrg={this.state.selectedOrg}
      passNewSelectedOrgId={this.handlNewSelectedOrgId.bind(this)}
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
              {this.state.visibleAreas.tree ? searchArea : null}
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
          {this.renderHeader()}
          {this.state.isAllUnitsReady ? this.renderMain() : this.renderLoading()}
        </div>
    );
  }
}
