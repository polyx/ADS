import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet'
import d2map from 'dhis2-gis-api'


export default class MapArea extends React.Component {
  constructor(props) {
    super(props);
    let coordinates = [];
    let selectedOrg = props.allUnits.find((org)=>{return org.id === props.levelOne[0].id});
    if (selectedOrg.featureType === "POINT") {
      coordinates = this.prepPointCoords(selectedOrg.coordinates);
    } else if (selectedOrg.featureType === "POLYGON") {
      coordinates = this.prepPolygonCoords(selectedOrg.coordinates);
    }

    this.state = {
      coordinates: coordinates,
      featureType: selectedOrg.featureType
    };

    // console.log(this.state);
    // console.log(selectedOrg);
  }

  componentDidMount() {
    if(this.state.featureType !== "NONE"){
      this.renderMap(this.state.coordinates, this.state.featureType);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.featureType !== "NONE"){
      this.renderMap(this.state.coordinates, this.state.featureType);
    }
  }

  componentWillReceiveProps(nextProps) {
    let selectedOrg = nextProps.selectedOrg;
    // console.log(selectedOrg);
    let coordinates;
    if (selectedOrg.featureType !== "NONE") {
      coordinates = JSON.parse(selectedOrg.coordinates);
      coordinates = this.getCoordinates(selectedOrg, coordinates);
      if (selectedOrg.featureType === "POINT"){
        // console.log("New coordinates", coordinates);
        this.setState({
          coordinates: coordinates,
          featureType: selectedOrg.featureType
        });
      }else if(selectedOrg.featureType === "POLYGON"){
        // console.log("POLYGON COORDS:", coordinates);
        this.setState({
          coordinates: coordinates,
          featureType: selectedOrg.featureType
        });
      }else if (selectedOrg.featureType === "MULTI_POLYGON"){
        // console.log(selectedOrg.coordinates);
        this.setState({
          coordinates: selectedOrg.coordinates,
          featureType: selectedOrg.featureType
        });
      }
    }else if(selectedOrg.featureType === "NONE"){
      this.setState({
        featureType: "NONE"
      })
    }

  }

  getCoordinates(selectedOrg, coordinates) {
    if (selectedOrg.featureType === "POINT") {
      coordinates = this.prepPointCoords(coordinates);
    } else if (selectedOrg.featureType === "POLYGON") {
      coordinates = this.prepPolygonCoords(coordinates);
    } else if (selectedOrg.featureType === "MULTI_POLYGON") {
      coordinates = this.prepMultiPolygon(coordinates);
      console.log(coordinates);
    }
    return coordinates;
  }

  prepPointCoords(point){
    return [point[1], point[0]];
  }

  prepPolygonCoords(points){
    let map_area = [];
    for (let point of points[0][0]) {
      map_area.push(this.prepPointCoords(point))
    }
    return map_area;
  }

  prepMultiPolygon(points){
    let map_areas = [];
    for (let polygon of points) {
      let poly = [];
      for (let point of polygon[0]) {
        poly.push(this.prepPointCoords(point));
      }
      map_areas.push(poly);
    }
    return map_areas;
  }

  renderMap(coords, type) {
    if(this.map === undefined){
      this.map = L.map('map');
    }else{
      this.map.remove();
      this.map = L.map('map');
    }
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    //
    if (type === "POLYGON"){
      let polygon = L.polygon(coords).addTo(this.map);
      let bounds = polygon.getBounds();
      this.map.fitBounds(bounds);

    }else if (type === "POINT"){
      let ico = L.icon({
        iconUrl: '/marker.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [-3, -76]
      });
      L.marker(coords, {icon: ico}).addTo(this.map);
      this.map.setView(coords, 15);
    }

  }


  render() {
    let mapStyle = {
      height: '600px'
    };

    return (
      <div>

        {(this.state.featureType !== "NONE" && (
          <div>
            <h3>Map:</h3>
            <div id="map" style={mapStyle}></div>
          </div>
          )) ||
          (<p>No map available for selected unit</p>)}
      </div>
    );
  }
}