import React, { Component } from 'react';
import Nav from '../Nav';
import Map from '../Map';
import TextInput from '../TextInput';
import s from './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      windowHeight : window.innerHeight,
      navHeight : 70,
      tiHeight : 100,
      msg : '',
      location : null,
      account : {
        loggedIn : false,
        name : null,
        email : null,
      },
      markers : [],
      disabledInput : true,
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize',this.onWindowResize,true);
  }


  onWindowResize = () => {
    const windowHeight = window.innerHeight;
    this.setState({windowHeight})
  }

  onInputChange = (evt) => {
    const msg = evt.target.value;
    this.setState({msg})
  }

  onSubmitMessage = () => {
    if (this.state.msg.length > 0){
      console.log(this.state.msg);
      const msg = '';
      this.setState({msg});
    }
  }

  onMapClickHandler = (event) => {
    let marker = {
      position: event.latLng,
      msg : "Hello!",
      time : null,
      defaultAnimation: 0,
      key: Date.now(),
      showMsg: false,
    };
    const markers = [
      ...this.state.markers,
      marker,
    ];
    this.setState({
      markers,
      disabledInput : false,
    });
  }

  // enableInput = (marker) => {
  //
  //
  //   return marker;
  // }

  updateMarkersHandler = (markers) => {
    this.setState({markers})
  }

  onMarkerClick = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showMsg: ! targetMarker.showMsg,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    const mapHeight = this.state.windowHeight - (this.state.navHeight + this.state.tiHeight);
    // console.log(
    //   this.state.windowHeight, mapHeight, this.state.navHeight, this.state.tiHeight
    // )
    return (
      <div className= {s.app}>
        <Nav height = {this.state.navHeight} account = {this.state.account}/>
        <Map
          height = {mapHeight + (! this.state.disabledInput ? 0 : this.state.tiHeight)}
          onMapClick = {this.onMapClickHandler}
          markers = {this.state.markers}
          updateMarkers = {this.updateMarkersHandler}
          onMarkerClick = {this.onMarkerClick}
        />
        <TextInput
          height = {this.state.disabledInput ? 0 : this.state.tiHeight}
          onInputChange = {this.onInputChange}
          onSubmit = {this.onSubmitMessage}
          disabled = {this.state.disabledInput}
          value = {this.state.msg}/>
      </div>
    );
  }
}

export default App;
