import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as gifshot from 'gifshot';
import Axios from 'axios';
import secrets from './secrets/config.json';
import {Line} from 'rc-progress';

class App extends Component {

  state = {
    video: null,
    gif: "http://i.imgur.com/IUNMjf1.gif",
    progress: 0
  }

  async componentDidMount(){
    await this.setState({video: document.getElementById("preview-video")})
    gifshot.takeSnapShot({      'webcamVideoElement': this.state.video,
    // Whether or not you would like the user's camera to stay on after the GIF is created
    // Note: The cameraStream Media object is passed back to you in the createGIF() callback function
    'keepCameraOn': true,
    // Expects a cameraStream Media object
    // Note: Passing an existing camera stream will allow you to create another GIF and/or snapshot without
    //	asking for the user's permission to access the camera again if you are not using SSL
    'cameraStream': null,}, function(obj) {});
  }

  captureGIF(){

    gifshot.createGIF({
      // You can pass an existing video element to use for the webcam GIF creation process,
      // and this video element will not be hidden (useful when used with the keepCameraOn option)
      // Pro tip: Set the height and width of the video element to the same values as your future GIF
      // Another Pro Tip: If you use this option, the video will not be paused, the object url not revoked, and
      // the video will not be removed from the DOM.  You will need to handle this yourself.
      'webcamVideoElement': this.state.video,
      // Whether or not you would like the user's camera to stay on after the GIF is created
      // Note: The cameraStream Media object is passed back to you in the createGIF() callback function
      'keepCameraOn': true,
      // Expects a cameraStream Media object
      // Note: Passing an existing camera stream will allow you to create another GIF and/or snapshot without
      //	asking for the user's permission to access the camera again if you are not using SSL
      'cameraStream': null,
      'text': this.state.albumId,
      // The font weight of the text that covers the animated GIF
      'fontWeight': 'bold',
      // The font size of the text that covers the animated GIF
      'fontSize': '16px',
      // The minimum font size of the text that covers the animated GIF
      // Note: This option is only applied if the text being applied is cut off
      'minFontSize': '10px',
      // Whether or not the animated GIF text will be resized to fit within the GIF container
      'resizeFont': false,
      // The font family of the text that covers the animated GIF
      'fontFamily': 'sans-serif',
      // The font color of the text that covers the animated GIF
      'fontColor': '#ffffff',
      // The horizontal text alignment of the text that covers the animated GIF
      'textAlign': 'right',
      // The vertical text alignment of the text that covers the animated GIF
      'textBaseline': 'bottom',
      'numFrames': 15,
      'progressCallback': (progress) => {this.setState({progress: progress});},
      'completeCallback': () => {this.setState({progress: 0});console.log('done')}
    }, (obj) => {
      if(!obj.error) {
        console.log(obj);
        var image = obj.image;
        // fetch(image)
        // .then(res => res.blob())
        // .then(blob => {
        //   console.log(blob);
        //   let bloburl = URL.createObjectURL(blob)
        //   this.setState({gif: bloburl});
        // });
        let animatedImage = document.createElement('img');
        animatedImage.src = image;
        document.body.appendChild(animatedImage);

      }
    });
  }

  async submitGIF(image){
    Axios.post(`https://api.imgur.com/3/album/${this.state.albumId}/add`, image, {headers: {Authorization: "Client-ID " + secrets.client_id}});
  }

  async createAlbum(){
    let res = await Axios.post("https://api.imgur.com/3/album",null ,{headers: {Authorization: "Client-ID " + secrets.client_id}});
    console.log(res.data.data.id);
    return res.data.data.id;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {this.state.gif ? <x-gif src={this.state.gif}></x-gif> : ""}
          <div style={{margin: '0 auto'}}>
            <div style={{width: '267px', position: 'absolute', marginTop: '-16px'}}>
              <Line percent={this.state.progress * 100} strokeWidth="4" strokeColor="#D3D3D3" />
            </div>
            <video height="200" width="200" id="preview-video"></video>

          </div>
          <button onClick={() => this.createAlbum()}>host album</button>
          <button onClick={() => this.captureGIF()}>click 4 gif</button>
          <input onChange={(e) => {this.setState({albumId: e.target.value})}} ></input>
        </header>
      </div>
    );
  }
}

export default App;
