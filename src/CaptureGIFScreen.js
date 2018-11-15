import React, { Component } from 'react';
import './App.css';
import GIFCapture from './GIFCapture';
import GIFPreview from './GIFPreview';

class CaptureGIFScreen extends Component {

  state = {
    gif: "http://i.imgur.com/IUNMjf1.gif",
    capturing: true
  }

  setGIF(gif){
      this.setState({gif: gif, capturing: false});
  }

  capture(){
      this.setState({capturing: true});
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        {this.state.capturing ? 
        <GIFCapture saveGIF={this.setGIF.bind(this)} albumId={this.props.match.params.albumid}/> 
        : 
        <GIFPreview gif={this.state.gif} albumId={this.props.match.params.albumid} exit={this.capture.bind(this)}/>
        }   
      </div>
    );
  }
}

export default CaptureGIFScreen;
