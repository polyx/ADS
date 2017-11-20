import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TreeArea from './TreeArea';


export default class BodyArea extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={6}>
              <TreeArea />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}