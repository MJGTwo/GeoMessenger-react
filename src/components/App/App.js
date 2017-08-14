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
      account : {
        loggedIn : false,
        name : null,
        email : null,
      }
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

  render() {
    const mapHeight = this.state.windowHeight - (this.state.navHeight + this.state.tiHeight);
    console.log(
      this.state.windowHeight, mapHeight, this.state.navHeight, this.state.tiHeight
    )
    return (
      <div className= {s.app}>
        <Nav height = {this.state.navHeight} account = {this.state.account}/>
        <Map height = {mapHeight}/>
        <TextInput height = {this.state.tiHeight} onInputChange = {this.onInputChange} value = {this.state.msg}/>
      </div>
    );
  }
}

export default App;
