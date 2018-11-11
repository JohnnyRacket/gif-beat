import React, { Component } from 'react';
import './App.css';
import CaptureGIFScreen from './CaptureGIFScreen';

class App extends Component {

  render() {
    return (
      <CaptureGIFScreen albumId="123456" />
    );
  }
}

export default App;
