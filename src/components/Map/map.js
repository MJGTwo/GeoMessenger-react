import React, {Component} from 'react';
import ReactMapboxGl, { Layer, Marker } from "react-mapbox-gl";

// import _ from 'lodash';
// import {
//   withGoogleMap,
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   Circle,
//   // MarkerClusterer
// } from 'react-google-maps';
// import {default as MarkerClusterer} from 'react-google-maps/lib/addons/MarkerClusterer';

import s from './map.css';

const Map = ReactMapboxGl({
accessToken: "pk.eyJ1IjoiZ2FyZG5tNCIsImEiOiJjaXVoaWNkNmIwMHNuMnRsM2s1ZGJoa2JsIn0.J3aEjd8rUNorM-6KwwpJEg"
});
const zoom = [8];
// const API_KEY = 'AIzaSyDuUqpv6shuq8CIWgVjLdmVLm8SU8eSHU0';



// const GoogleMapContainer = withGoogleMap(props => (
//   <GoogleMap
//     ref={props.onMapLoad}
//     defaultZoom={12}
//     center={props.center}
//     onClick={props.onMapClick}
//   >
//     <MarkerClusterer
//       averageCenter
//       enableRetinaIcons
//       gridSize={60}
//     >
//       {props.markers.map(marker => (
//         <Marker
//           {...marker}
//           onClick = {() => props.onMarkerClick(marker)}
//           onRightClick={() => props.onMarkerRightClick(marker)}
//         >
//
//           {marker.showMsg && (
//             <InfoWindow onCloseClick={() => props.onMarkerClick(marker)}>
//               <div>{marker.msg}</div>
//             </InfoWindow>
//           )}
//         </Marker>
//       ))}
//     </MarkerClusterer>
//     {props.center && (
//       <Circle
//      center={props.center}
//      radius={props.center.accr}
//      options={{
//        fillColor: `blue`,
//        fillOpacity: 0.40,
//        strokeColor: `blue`,
//        strokeOpacity: 1,
//        strokeWeight: 1,
//      }}
//    />
//     )}
//   </GoogleMap>
// ));



export default class MapContainer extends Component{

  static defaultProps = {
      center: {lat: 40.6976701, lng: -74.2598661},
      zoom: 11,
      height : '800'
  };
  constructor(props){
    super(props);
    this.props = props;
  }

  // handleMapLoad = (map) => {
  //   this._mapComponent = map;
  //   // if (map) {
  //   //   console.log(map.getZoom());
  //   // }
  // }

  // handleMapClick = (event) => {
  //   this.props.onMapClick(event);
  // }
  //
  // handleMarkerRightClick = (targetMarker) => {
  //   const nextMarkers = this.props.markers.filter(marker => marker !== targetMarker);
  //   this.props.updateMarkers(nextMarkers);
  // }
  //
  // handleMarkerClick = (targetMarker) => {
  //   // console.log("marker clicked",targetMarker)
  //   if (targetMarker.msg.length === 0) this.handleMarkerRightClick(targetMarker);
  //   else this.props.onMarkerClick(targetMarker)
  // }

  renderMap = (height,center) => {
    console.log(center)
    return (
      <Map
        style="mapbox://styles/mapbox/navigation-preview-day-v2"
        containerStyle={{
          height: `${height}px`,
          width: "100vw"
        }}
        zoom = {zoom}
        center = {[-73.671130,42.730725]}
        >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
        </Layer>
      </Map>)
  }

  render(){
    const {height,center} = {...this.props};
    // console.log("mappos", center)
    return (
      <div >

        {/* <GoogleMapContainer
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
        /> */}
        {this.renderMap(height,center)}

      </div>

    );
  }

}
