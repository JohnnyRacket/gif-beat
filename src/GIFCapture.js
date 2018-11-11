import React, { Component } from 'react';
import * as gifshot from 'gifshot';
import {Line} from 'rc-progress';

class GIFCapture extends Component {

  state = {
    video: null,
    progress: 0,
    stream: null
  }
  
  async componentDidMount(){
    await this.setState({video: document.getElementById("preview-video")})
    gifshot.takeSnapShot({
    'webcamVideoElement': this.state.video,
    'keepCameraOn': true,
    'cameraStream': this.state.stream}, async obj => {
        console.log(obj);
        await this.setState({stream: obj.cameraStream});
        console.log('sdfdl');
    });
    
  }

  captureGIF(){

    gifshot.createGIF({
        'gifWidth': 480,
        'gifHeight': 360,
      // You can pass an existing video element to use for the webcam GIF creation process,
      // and this video element will not be hidden (useful when used with the keepCameraOn option)
      // Pro tip: Set the height and width of the video element to the same values as your future GIF
      // Another Pro Tip: If you use this option, the video will not be paused, the object url not revoked, and
      // the video will not be removed from the DOM.  You will need to handle this yourself.
      // Whether or not you would like the user's camera to stay on after the GIF is created
      // Note: The cameraStream Media object is passed back to you in the createGIF() callback function
      'keepCameraOn': true,
      // Expects a cameraStream Media object
      // Note: Passing an existing camera stream will allow you to create another GIF and/or snapshot without
      //	asking for the user's permission to access the camera again if you are not using SSL
      'cameraStream': this.state.stream,
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
        this.props.saveGIF(obj.image);
      }
    });
  }

  render() {
    return (
        <div className="video-container">
            <div style={{width: '100%', position: 'absolute', marginTop: '-16px'}}>
                <Line percent={this.state.progress * 100} strokeWidth="4" strokeColor="#D3D3D3" />
            </div>
            <video className="video" id="preview-video"></video>
            <button style={{position: 'fixed', bottom: '2rem', left: '50%'}} onClick={() => this.captureGIF()}>click 4 gif</button>
        </div>
    );
  }
}

export default GIFCapture;
