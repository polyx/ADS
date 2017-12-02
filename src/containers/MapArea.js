import React from 'react';
import PropTypes from 'prop-types';

export default class MapArea extends React.Component {



  render() {
    return(
      <p> GoogleMaps </p>
    );    
  }
}

MapArea.PropTypes = {
  searchSet: PropTypes.array,
  selectedOrgId: PropTypes.number,
}