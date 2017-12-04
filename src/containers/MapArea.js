import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet'
import d2map from 'dhis2-gis-api'


export default class MapArea extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    let coordinates = [];

    if (props.selectedOrgId.featureType === "POINT"){
      coordinates = this.prepPointCoords(props.selectedOrgId.coordinates);
    }else if (props.selectedOrgId.featureType === "POLYGON"){
      coordinates = this.prepPolygonCoords(props.selectedOrgId.coordinates);
    }else{

    }

    this.state = {
      coordinates: coordinates,
      featureType: props.selectedOrgId.featureType
    };
  }

  componentDidMount() {
    if(this.state.featureType !== "NONE"){
      this.renderMap(this.state.coordinates, this.state.featureType);
    }
  }

  prepPointCoords(point){
    return [point[1], point[0]]
  }

  prepPolygonCoords(points){
    let map_area = [];
    for (let point of points[0][0]) {
      map_area.push(this.prepPointCoords(point))
    }
    return map_area;
  }

  renderMap(coords, type) {
    // let map = d2map('map');
    let map = L.map('map');

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // let poly = L.polygon(coords).addTo(map);
    let ico = L.icon({
      iconUrl: '/marker.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [-3, -76]
    });

    //
    if (type === "POLYGON"){
      let polygon = L.polygon(coords).addTo(map)
      let bounds = polygon.getBounds();
      map.fitBounds(bounds);

    }else {
      L.marker(coords, {icon: ico}).addTo(map);
      map.setView(coords, 15);
    }

  }


  render() {
    let mapStyle = {
      height: '600px'
    };

    return (
      <div>
        <h1>Map:</h1>
        <div id="map" style={mapStyle}></div>
      </div>
    );
  }
}

// MapArea.PropTypes = {
//     tree: PropTypes.array.isRequired,
// };