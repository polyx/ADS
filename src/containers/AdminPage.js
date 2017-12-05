import React from "react";
import {Button, Col, Glyphicon, Grid, ListGroup, ListGroupItem, Panel, PanelGroup, Row} from "react-bootstrap";
import {
  getDataElementSettings, getDataSet, getOrgUnit, loadDataElements, postDataElementSettings,
  putDataElementSettings, deleteDataElementSettings
} from "../api";
import HeaderArea from "./HeaderArea";
import {Link} from "react-router-dom";


export default class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orgID: props.match.params.orgID,
      dataElements: false,
      ready: false
    };
  }

  async componentDidMount() {
    let orgData = await getOrgUnit(this.state.orgID);
    let dataElementsArr = [];
    let dataElemsToShow = await getDataElementSettings(orgData.id);
    console.log(dataElemsToShow);
    for (let dataSet of orgData.dataSets) {
      let data = await getDataSet(dataSet.id);
      for (let dataSetElement of data.dataSetElements) {
        // console.log(dataSetElement);
        dataElementsArr.push(dataSetElement.dataElement.id);
      }
    }
    let dataElems = await loadDataElements(dataElementsArr);
    if (dataElemsToShow){
      this.setState({
        dataElements: dataElems,
        ready: true,
        showDataElements: dataElemsToShow
      });
    }
    this.setState({
      dataElements: dataElems,
      ready: true,
      showDataElements: {}
    });
  }

  render() {
    return (
      <div>
        <HeaderArea/>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <PanelGroup style={{fontSize: "1em"}} activeKey={this.state.activePanelKey}
                          onSelect={this.handlePanelSelect}>
                <Panel collapsible defaultExpanded header={
                  <div style={{height: "1.5em"}}>
                    <span style={{float: "left"}}>Data Elements</span>
                    <span style={{float: "right"}}><Link to={""}>Back</Link></span>
                  </div>}>
                  <ListGroup fill>
                    {this.state.ready && (
                      this.state.dataElements.dataElements.map((elem) => {
                        return (
                          <ListGroupItem key={elem.id}>
                            <DataElemenetItem elem={elem}
                                              orgID={this.state.orgID}
                                              toShow={(this.state.showDataElements)}/> {elem.displayName}
                          </ListGroupItem>);
                      })
                    )}
                  </ListGroup>
                </Panel>
              </PanelGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class DataElemenetItem extends React.Component {
  constructor(props) {
    super(props);
    if (props.elem.id in props.toShow) {
      this.state = {
        elem: props.elem,
        btnStyle: "danger",
        glyph: "minus",
        label: "hide",
      };
    } else {
      this.state = {
        elem: props.elem,
        btnStyle: "success",
        glyph: "plus",
        label: "show"
      };
    }
  }

  async showDataElement(elemID, orgID) {
    let dataElemSettings = await getDataElementSettings(orgID);
    console.log(dataElemSettings);
    if (dataElemSettings === null || dataElemSettings.httpStatusCode === 404) {
      let resp = await postDataElementSettings(elemID, orgID);
      console.log(resp);
    } else {
      console.log(dataElemSettings);
      let body = dataElemSettings;
      body[elemID] = 0;
      let resp;
      // console.log(body);
      // let resp = await deleteDataElementSettings(elemID, orgID);
      // console.log(resp);
      resp = await putDataElementSettings(elemID, orgID, body);
      console.log(resp);
    }
  }

  async hideDataElement(elemID, orgID){
    let dataElemSettings = await getDataElementSettings(orgID);
    if(dataElemSettings.httpStatusCode !== 404){
      delete dataElemSettings[elemID];
      let resp = await putDataElementSettings(elemID, orgID, dataElemSettings);
      console.log(resp);
    }
  }

  render() {
    return (
      <Button bsStyle={this.state.btnStyle} bsSize="small" onClick={(event) => {
        if (this.state.btnStyle === "success") {
          this.setState({
            btnStyle: "danger",
            glyph: "minus",
            label: "hide",
          });
          this.showDataElement(this.state.elem.id, this.props.orgID);
        } else {
          this.setState({
            btnStyle: "success",
            glyph: "plus",
            label: "show"
          });
          this.hideDataElement(this.state.elem.id, this.props.orgID);
        }
      }}><Glyphicon glyph={this.state.glyph}/> {this.state.label}</Button>
    );
  }
}