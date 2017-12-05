import React from 'react';
import {FormGroup, Navbar, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

export default class HeaderSearch extends React.Component {

  constructor() {
    super();

    let fuseOptions = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["name",]};

    this.state = {
      fuseOptions: fuseOptions,
    }

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

  handleSubmitted(id) {
    let fuse = new Fuse(this.props.allUnits, this.state.fuseOptions);
    let result = fuse.search(id);
    this.props.handlNewSearchSet(result.slice(0,50));
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
          {/* <Button type="submit" >
            <Glyphicon glyph="search"/>
          </Button> */}
        </Navbar.Form>          
      </div>
    );
  }
}

HeaderSearch.propTypes = {
  allUnits: PropTypes.array.isRequired,
  handlNewSearchSet: PropTypes.func.isRequired,
}