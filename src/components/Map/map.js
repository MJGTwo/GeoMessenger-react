import React, {Component} from 'react';
// import _ from 'lodash';
import {
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
  Circle,
} from 'react-google-maps';

import s from './map.css';

// const API_KEY = 'AIzaSyDuUqpv6shuq8CIWgVjLdmVLm8SU8eSHU0';




const GoogleMapContainer = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    center={props.center}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onClick = {() => props.onMarkerClick(marker)}
        onRightClick={() => props.onMarkerRightClick(marker)}
      >

        {marker.showMsg && (
          <InfoWindow onCloseClick={() => props.onMarkerClick(marker)}>
            <div>{marker.msg}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
    {props.center && (
      <Circle
     center={props.center}
     radius={props.center.accr}
     options={{
       fillColor: `blue`,
       fillOpacity: 0.40,
       strokeColor: `blue`,
       strokeOpacity: 1,
       strokeWeight: 1,
     }}
   />
    )}
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
    this.props = props;
  }

  handleMapLoad = (map) => {
    this._mapComponent = map;
    // if (map) {
    //   console.log(map.getZoom());
    // }
  }

  handleMapClick = (event) => {
    this.props.onMapClick(event);
  }

  handleMarkerRightClick = (targetMarker) => {
    const nextMarkers = this.props.markers.filter(marker => marker !== targetMarker);
    this.props.updateMarkers(nextMarkers);
  }

  handleMarkerClick = (targetMarker) => {
    // console.log("marker clicked",targetMarker)
    if (targetMarker.msg.length === 0) this.handleMarkerRightClick(targetMarker);
    else this.props.onMarkerClick(targetMarker)
  }

  render(){
    const {height,center} = {...this.props};
    // console.log("mappos", center)
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
          onMarkerClick={this.handleMarkerClick}
          center = {center}
        />


      </div>

    );
  }

}
