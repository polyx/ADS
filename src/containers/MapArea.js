import React from 'react';
import PropTypes from 'prop-types';

export default class InfoArea extends React.Component {
  render() {
    return(
      <p> GoogleMaps </p>
    );    
  }
}

InfoArea.PropTypes = {
  tree: PropTypes.array.isRequired,
}