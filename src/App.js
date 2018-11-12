import React, { Component } from 'react';
import './App.css';
import CaptureGIFScreen from './CaptureGIFScreen';
import PlayGIFScreen from './PlayGIFScreen';
import Axios from 'axios';
import secrets from './secrets/config.json';

class App extends Component {

  state = {
    captureScreen: false,
    hostScreen: false,
    albumIdModal: false,
    albumId: "Xb6wU"
  }

  async createAlbum(){
    //let res = await Axios.post("https://api.imgur.com/3/album",null ,{headers: {Authorization: "Client-ID " + secrets.client_id}});
    //console.log(res.data.data.id);
    //this.setState({albumId: res.data.data.id, hostScreen: true});
    console.log('create album called');
    this.setState({hostScreen: true});
  }

  launchAlbumIdModal(){
    this.setState({albumIdModal: true});
  }

  render() {
    return (
      <div>
        {!this.state.captureScreen && !this.state.hostScreen ? (
        <div>
          <h1>Welcome to Gif Beat</h1>
          <button onClick={() => {this.launchAlbumIdModal()}}>Add GIFs with a Code</button>
          <button onClick={() => {this.createAlbum()}}>Create Party</button>
          <button>Re-Host Existing Party</button>
        </div>) : "" }
        { this.state.captureScreen ? <CaptureGIFScreen albumId={this.state.albumId} /> : ""}
        { this.state.hostScreen ? <PlayGIFScreen albumId={this.state.albumId} /> : "" }
        { this.state.albumIdModal ? "album id modal" : ""}
      </div>
      
    );}
}

export default App;
