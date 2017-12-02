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
      searchSet: [],
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

  handlNewSearchSet(list) {  
    this.setState({searchSet: list});
    //console.log(this.state.searchRes);
    //TODO: why the this.state.serchRes shows old data
  }

  handlNewSelectedOrgId(newId) {
    console.log('app new selecId ' + newId);
    this.setState({selectedOrgId: newId})
  }

  renderHeader() {
    return( 
      <HeaderArea 
        tree={this.state.tree}
        visibleAreas={this.state.visibleAreas}
        handlNewSearchSet={this.handlNewSearchSet.bind(this)}/>
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
      selectedOrgId={this.state.selectedOrgId}
      searchSet={this.state.searchSet}
      passNewSelectedOrgId={this.handlNewSelectedOrgId.bind(this)}
      />;
    let infoArea = <InfoSheetArea 
      selectedOrgId={this.state.selectedOrgId}
      />;
    let mapArea = <MapArea
      selectedOrgId={this.state.selectedOrgId}
      searchSet={this.state.searchSet}
      />;
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