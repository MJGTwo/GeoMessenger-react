import React, {Component} from 'react';
import _ from 'lodash';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import s from './map.css';

const API_KEY = 'AIzaSyDuUqpv6shuq8CIWgVjLdmVLm8SU8eSHU0';




const GoogleMapContainer = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: 40.6976684, lng: -74.0154206 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));



export default class Map extends Component{

  static defaultProps = {
      center: {lat: 40.6976701, lng: -74.2598661},
      zoom: 11,
      height : '800'
  };
  constructor(props){
    super(props);
  }

  handleMapLoad = (map) => {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick = (event) => {
    this.props.onClickHandler(event);
  }

  handleMarkerRightClick = (targetMarker) => {
    const nextMarkers = this.props.markers.filter(marker => marker !== targetMarker);
    this.props.updateMarkers(nextMarkers);
  }

  render(){
    const {height} = {...this.props};
    return (
      <div className = {s.map}  id = "map" style = {{height : `${height}px`}}>

        <GoogleMapContainer
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.props.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />


      </div>

    );
  }

}
