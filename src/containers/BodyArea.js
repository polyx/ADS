import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TreeListOrg from '../components/TreeListOrg';


export default class BodyArea extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={6}>
              <TreeListOrg />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}