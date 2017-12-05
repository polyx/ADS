import React from "react";
import {Button, Col, Glyphicon, Grid, ListGroup, ListGroupItem, Panel, PanelGroup, Row} from "react-bootstrap";
import {getDataSet, getOrgUnit, loadDataElements} from "../api";


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
    for (let dataSet of orgData.dataSets) {
      let data = await getDataSet(dataSet.id);
      // console.log(data.dataSetElements);
      for (let dataSetElement of data.dataSetElements) {
        // console.log(dataSetElement);
        dataElementsArr.push(dataSetElement.dataElement.id);
      }
    }
    let x = await loadDataElements(dataElementsArr);
    this.setState({
      dataElements: x,
      ready: true
    });
    console.log(x);

  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={3} md={4}>
          </Col>
          <Col xs={9} md={8}>
            <PanelGroup style={{fontSize:'1em'}} activeKey={this.state.activePanelKey} onSelect={this.handlePanelSelect}>
              <Panel collapsible header="Data Elements">
                <ListGroup fill>
                {this.state.ready && this.state.dataElements.dataElements.map((elem) => {
                  return (<ListGroupItem key={elem.id}>
                    <Button bsStyle="danger"><Glyphicon glyph="remove-circle" />Hide</Button>{elem.displayName}
                  </ListGroupItem>)
                })}
                </ListGroup>
              </Panel>
            </PanelGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}