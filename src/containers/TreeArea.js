import React from 'react';
import TreeView from 'treeview-react-bootstrap';
// import TreeView from '../../node_modules/react-bootstrap-treeview/src/react-bootstrap-treeview';
import PropTypes from 'prop-types';


export default class TreeArea extends React.Component {

  render() {
    return(
      // <TreeView data={this.props.orgUnits} levels={0} showBorder={false} selectable={false} />
      <TreeView data={this.props.orgUnits}/>
    );
  }
}

TreeArea.PropTypes = {
  orgUnits: PropTypes.array.isRequired,
}