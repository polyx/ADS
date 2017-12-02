import React from 'react';
import {FormGroup, Navbar, FormControl, Button, Glyphicon} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class SearchArea extends React.Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitted = this.handleSubmitted.bind(this);
  }

  handleChange(event) {
    if(event.key==="Enter"){
      this.handleSubmitted(event.target.value);
    } else {
      //console.log(event.target.value);
    }
  }

  handleSubmitted(val) {
    // only unique ids in searchSet 
    //this.props.handleSearchRes(val);
    this.props.handlNewSearchSet([1, 2, 3]);
  }

  render() {
    return(
      <div>
       <Navbar.Form pullLeft onSubmit={this.handleSubmitted}>
          <FormGroup>
            <FormControl 
              type="text"
              placeholder="Search" 
              onKeyPress={this.handleChange}
                />
          </FormGroup>
          <Button type="submit" >
            <Glyphicon glyph="search"/>
          </Button>
        </Navbar.Form>          
      </div>
    );
  }
}

SearchArea.PropTypes = {
  tree: PropTypes.array.isRequired,
  handlNewSearchSet: PropTypes.func.isRequired,
}