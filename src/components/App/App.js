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
      selectedMarker : null,
      disableMapClick : false,
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
    if (this.state.msg.length > 0 && this.state.selectedMarker){
      this.editMarkerMsg();
      this.toggleMap();
      this.setState({disabledInput : true})
    }
  }

  editMarkerMsg = () => {
    let selectedMarker = this.state.selectedMarker;
    let markers = this.state.markers;
    let msg = this.state.msg;
    selectedMarker.msg = msg;
    selectedMarker.showMsg = true;
    markers = markers.map ((marker) => {
      if (marker.key === selectedMarker.key){
        return selectedMarker;
      }
      return marker
    });
    msg = '';
    this.setState({selectedMarker,markers,msg})
  }

  toggleMap = () => {
    const disableMapClick = ! this.state.disableMapClick;
    this.setState({disableMapClick, })
  }

  createMarker = (latLng) => {
    let marker = {
      position: latLng,
      msg : "-insert message-",
      time : null,
      defaultAnimation: 0,
      key: Date.now(),
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

  onMapClickHandler = (event) => {
    if ( ! this.state.disableMapClick){
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

  isMarkerSelected = () => {
    return (this.state.selectedMarker !== null)
  }

  updateMarkersHandler = (markers) => {
    this.setState({markers})
  }

  selectMarker = (selectedMarker) => {
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

  onMarkerClick = (targetMarker) => {
    this.selectMarker(targetMarker);
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
