import React, { Component } from 'react';
import Axios from 'axios';
import secrets from './secrets/config.json';

class GIFPreview extends Component {

  async submitGIF(image){
    Axios.post(`https://api.imgur.com/3/album/${this.props.albumId}/add`, image, {headers: {Authorization: "Client-ID " + secrets.client_id}});
  }

  render() {
    return (
      <div style={{width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems:'center', background: `url(${this.props.gif}) no-repeat center center fixed`,
      backgroundSize: 'cover'}}>
       
       <button style={{position: 'absolute', margin: '0 auto', bottom: '2rem', left: '50%'}} onClick={this.submitGIF.bind(this)}>Submit GIF</button>
       <button style={{position: 'absolute', margin: '0 auto', top: '1rem', left: '1rem'}} onClick={this.props.exit.bind(this)}>exit</button>
      </div>
    );
  }
}

export default GIFPreview;
