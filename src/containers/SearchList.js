import React from 'react';
import PropTypes from 'prop-types';

export default class SearchList extends React.Component {
  render() {
    //let styleList = {height:'30px', padding: '5px'};
    let styleList = {cursor: 'pointer'};
    return(
      <ol>
        {this.props.searchSet.map((org) => {
          return <li key={org.id} onClick={()=>{this.props.passNewSelectedOrgId(org.id)}} style={styleList}>{org.name}</li>
        })}
      </ol>
    );
  }
}

SearchList.propTypes = {
  searchSet: PropTypes.array.isRequired,
  passNewSelectedOrgId: PropTypes.func.isRequired,
}