import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {getBaseUrl} from '../components/BaseUrl';
import {loadOrgUnits, loadQuery} from '../components/LoadOrgUnits';
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
      isAllUnitsReady: false,
      allUnits: '',
      levelOneIds: '',
      selectedOrgId: '',
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
    console.log('app new selecId ' + newId);
    this.setState({selectedOrgId: newId})
  }

  renderHeader() {
    return( 
      <HeaderArea 
        allUnits={this.state.allU}
        visibleAreas={this.state.visibleAreas}
        handlNewSearchSet={this.handlNewSearchSet.bind(this)}/>
    )
  }

  renderLoading() {
    return(
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
    let temp_data = {
        children: [],
        coordinates: [[[[-11.3516,8.0819],[-11.3553,8.0796],[-11.3592,8.0779],[-11.3615,8.0764],[-11.3665,8.0724],[-11.374,8.0686],[-11.3765,8.0678],[-11.3815,8.0666],[-11.3859,8.0644],[-11.3891,8.0631],[-11.3934,8.0607],[-11.3972,8.0589],[-11.3994,8.0572],[-11.4048,8.0523],[-11.4075,8.0501],[-11.4115,8.0482],[-11.4144,8.0461],[-11.4169,8.0434],[-11.4184,8.0406],[-11.4189,8.0384],[-11.4192,8.0331],[-11.42,8.0298],[-11.4236,8.024],[-11.4258,8.0228],[-11.4339,8.0207],[-11.4389,8.0222],[-11.4417,8.0235],[-11.4428,8.0253],[-11.4461,8.0281],[-11.448,8.0307],[-11.449,8.0344],[-11.4492,8.0454],[-11.4494,8.0494],[-11.4501,8.0522],[-11.4521,8.0567],[-11.4528,8.0595],[-11.4531,8.0625],[-11.4532,8.0677],[-11.4527,8.0727],[-11.4514,8.0786],[-11.4527,8.0836],[-11.4532,8.0874],[-11.4535,8.0964],[-11.4535,8.1033],[-11.4529,8.1072],[-11.4507,8.1126],[-11.45,8.1163],[-11.4502,8.1202],[-11.4509,8.1229],[-11.4532,8.1282],[-11.4534,8.1325],[-11.4524,8.1357],[-11.4482,8.1423],[-11.4442,8.1401],[-11.442,8.14],[-11.44,8.1409],[-11.4369,8.1434],[-11.434,8.145],[-11.4298,8.1459],[-11.4273,8.1468],[-11.4206,8.1501],[-11.4166,8.1532],[-11.4096,8.1603],[-11.4056,8.1634],[-11.4026,8.1641],[-11.3982,8.1636],[-11.3938,8.1616],[-11.3913,8.1609],[-11.3859,8.1603],[-11.3833,8.1597],[-11.3779,8.1574],[-11.3736,8.1564],[-11.3695,8.1524],[-11.3657,8.1475],[-11.3638,8.1444],[-11.3623,8.1407],[-11.3589,8.1286],[-11.3574,8.1218],[-11.3525,8.1071],[-11.3509,8.1012],[-11.3505,8.0968],[-11.3504,8.091],[-11.3508,8.0868],[-11.3516,8.0819]]]],
        displayName: "Ahamadyya Mission Cl",
        featureType: "POLYGON",
        id: "plnHVbJR6p4"
    };

    let treeArea = <TreeArea 
      allUnits={this.state.allUnits}
      levelOne={this.state.levelOne}
      selectedOrgId={this.state.selectedOrgId}
      searchSet={this.state.searchSet}
      passNewSelectedOrgId={this.handlNewSelectedOrgId.bind(this)}
      />;
    let infoArea = <InfoSheetArea 
      selectedOrgId={this.state.selectedOrgId}
      />;
    let mapArea = <MapArea selectedOrgId={temp_data} searchSet={this.state.searchSet} />;
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
    return(
      <div>
        {this.state.isUrlReady ? this.renderHeader() : null}
        {this.state.isAllUnitsReady ? this.renderMain() : this.renderLoading()}
      </div> 
    );
  }
}