import React, { Component } from 'react';
import * as gifshot from 'gifshot';
import {Circle} from 'rc-progress';
import loader from './photo-camera.svg';

class GIFCapture extends Component {

  state = {
    video: null,
    progress: 0,
    stream: null
  }

  async startCamera(){
    gifshot.takeSnapShot({
      'webcamVideoElement': this.state.video,
      'keepCameraOn': true,
      'cameraStream': this.state.stream}, async obj => {
          await this.setState({stream: obj.cameraStream});
      }); 
  }

  async stopCamera(){
    if(this.state.stream !== null) this.state.stream.getTracks().forEach(track => track.stop());
    this.setState({stream: null});
  }
  
  async componentDidMount(){
    await this.setState({video: document.getElementById("preview-video")})
    this.startCamera();
    window.onfocus = () => {this.startCamera()};
    window.onblur = () =>{this.stopCamera()};
  }

  async componentWillUnmount(){
    this.stopCamera();
    window.onfocus = null;
    window.onblur = null;
  }

  captureGIF(){
    this.setState({progress: .025});
    gifshot.createGIF({
        'gifWidth': 352,
        'gifHeight': 240,
      // You can pass an existing video element to use for the webcam GIF creation process,
      // and this video element will not be hidden (useful when used with the keepCameraOn option)
      // Pro tip: Set the height and width of the video element to the same values as your future GIF
      // Another Pro Tip: If you use this option, the video will not be paused, the object url not revoked, and
      // the video will not be removed from the DOM.  You will need to handle this yourself.
      // Whether or not you would like the user's camera to stay on after the GIF is created
      // Note: The cameraStream Media object is passed back to you in the createGIF() callback function

      // Expects a cameraStream Media object
      // Note: Passing an existing camera stream will allow you to create another GIF and/or snapshot without
      //	asking for the user's permission to access the camera again if you are not using SSL
      'cameraStream': this.state.stream,
      'numFrames': 15,
      'progressCallback': (progress) => {this.setState({progress: progress});},
      'completeCallback': () => {this.setState({progress: 0})}
    }, (obj) => {
      if(!obj.error) {
        this.props.saveGIF(obj.image);
      }
    });
  }

  render() {
    return (
        <div className="video-container" style={{zIndex: 100}}>
            <div style={{padding: '2rem', position: 'absolute',left: '50%', transform: 'translate(-50%, -50%)', top: '33%', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={loader} className="camera-loader"  />
            </div>
            <div style={{width: '100px', position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3}}>
                <Circle percent={this.state.progress * 100} strokeWidth="10" strokeColor="#e74c3c" />
                {this.state.progress === 0 ? <button style={{ padding: '2rem', position: 'absolute',left: '50%', transform: 'translate(-50%, -50%)', top: '48%', background: 'transparent', fontWeight: 'bold', color: 'white', border: 'none', fontSize: '2rem', outline: 'none'}} onClick={() => this.captureGIF()}>Rec.</button> : "" }

            </div>
            <video className="video" id="preview-video" style={{zIndex: 2}}></video>
        </div>
    );
  }
}

export default GIFCapture;
