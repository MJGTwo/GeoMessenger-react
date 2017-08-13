import React, {Component} from 'react';
import GoogleMap from 'google-map-react';

import s from './map.css';

const API_KEY = 'AIzaSyDuUqpv6shuq8CIWgVjLdmVLm8SU8eSHU0';

export default class Map extends Component{

  static defaultProps = {
      center: {lat: 40.6976701, lng: -74.2598661},
      zoom: 11,
      height : '800'
  };
  constructor(props){
    super(props);
  }

  render(){
    const {height} = {...this.props};
    console.log('map', height)
    return (
      <div className = {s.map} style = {{height : `${height}px`}}>
        <GoogleMap
          center={this.props.center}
          zoom={this.props.zoom}
          bootstrapURLKeys={{
            key: API_KEY,
            language: 'en',
          }}
        >
        </GoogleMap>
      </div>

    );
  }

}
