import React, { Component } from 'react';
import canUseDOM from "can-use-dom";
import Nav from '../Nav';
import Map from '../Map';
import TextInput from '../TextInput';
import s from './App.css';


const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);


class App extends Component {

  constructor(props){
    super(props);
    this.isUnmounted = false;
    this.state = {
      windowHeight : window.innerHeight,
      navHeight : 70,
      tiHeight : 100,
      center : null,
      msg : '',
      location : null,
      account : {
        loggedIn : false,
        name : null,
        email : null,
      },
      markers : [],
      disabledInput : true,
      selectedMarker : null,
      disableMapClick : false,
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize',this.onWindowResize,true);
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accr: position.coords.accuracy,
        }
      });
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105,
          accr : 100,
        }
      });
    });
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  showPosition = (position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.setState({pos})
      // console.log('pos2',pos)
  }


  onWindowResize = () => {
    const windowHeight = window.innerHeight;
    this.setState({windowHeight})
  }

  onInputChange = (evt) => {
    const msg = evt.target.value;
    this.setState({msg})
  }

  toggleMap = () => {
    const disableMapClick = ! this.state.disableMapClick;
    this.setState({disableMapClick, })
  }

  isMarkerSelected = () => {
    return (this.state.selectedMarker !== null)
  }



  createMarker = (latLng) => {
    let marker = {
      position: latLng,
      msg : "-insert message-",
      time : null,
      defaultAnimation: 0,
      key: Date.now(), // + username
      showMsg: false,
    };
    return marker;
  }

  addMarker = (marker) => {
    const markers = [
      ...this.state.markers,
      marker,
    ];
    return markers;
  }

  onMarkerClick = (targetMarker) => {
    if (! this.state.disableMapClick) this.selectMarker(targetMarker);
  }

  updateMarkersHandler = (markers) => {
    // If the markers are being updated, it means a marker is being added or removed
    // which means we can enable clicking on the mpa and disable input.
    this.setState({markers, disableMapClick: false, disabledInput : true})

  }

  refreshMarkers = (newMarker) => {
    //update the info in the marker list, but doesn't remove a marker.
    let markers = this.state.markers;
    return markers.map ((marker) => {
      if (marker.key === newMarker.key){
        return newMarker;
      }
      return marker
    });
  }

  onSubmitMessage = () => {
    //Once the user types a message and has selected a marker
    if (this.state.msg.length > 0 && this.state.selectedMarker){
      //we edit the marker's msg and refresh the map, enable clicking on the map
      // and disable input.
      this.editMarkerMsg();
      this.toggleMap();
      this.setState({disabledInput : true})
    }
  }

  editMarkerMsg = () => {
    //copies msg over to marker, refreshes marker list, clears msg. Updates state.
    let selectedMarker = this.state.selectedMarker;
    let markers = this.state.markers;
    let msg = this.state.msg;
    selectedMarker.msg = msg;
    selectedMarker.showMsg = true;
    markers = this.refreshMarkers(selectedMarker);
    msg = '';
    this.setState({selectedMarker,markers,msg})
  }




  onMapClickHandler = (event) => {
    // if mapclick is not disabled
    if ( ! this.state.disableMapClick){
      //create marker, add it to markers, update state. disable map click, edit message.
      const marker = this.createMarker(event.latLng);
      const markers = this.addMarker(marker);
      this.setState({
        markers,
        disabledInput : false,
        selectedMarker : marker
      });
      this.toggleMap();
      this.editMarkerMsg();

    }

  }

  selectMarker = (selectedMarker) => {
    //selects a marker from the marker list.
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === selectedMarker) {
          return {
            ...marker,
            showMsg: ! selectedMarker.showMsg,
          };
        }
        return marker;
      }),
      selectedMarker,
    });
  }



  render() {
    const mapHeight = this.state.windowHeight - (this.state.navHeight + this.state.tiHeight);
    return (
      <div className= {s.app}>
        <Nav height = {this.state.navHeight} account = {this.state.account}/>
        <Map
          height = {mapHeight + (! this.state.disabledInput ? 0 : this.state.tiHeight)}
          onMapClick = {this.onMapClickHandler}
          markers = {this.state.markers}
          updateMarkers = {this.updateMarkersHandler}
          onMarkerClick = {this.onMarkerClick}
          center = {this.state.center}
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
