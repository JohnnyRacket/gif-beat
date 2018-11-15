import React, { Component } from 'react';
import Axios from 'axios';
import secrets from './secrets/config.json';

class GIFPreview extends Component {

  async submitGIF(image){
    console.log(this.props.albumId);
    let res = await Axios.post('https://api.imgur.com/3/image', {image: this.props.gif.split(',')[1]}, {headers: {Authorization: "Client-ID " + secrets.imgur.client_id}});
    console.log(res);
    let deletehash = res.data.data.deletehash;
    await Axios.post(`https://api.imgur.com/3/album/${this.props.albumId}/add`, {deletehashes:[deletehash]}, {headers: {Authorization: "Client-ID " + secrets.imgur.client_id}});
    this.props.exit();
  }//8UFXOXUBAfgygf4

  render() {
    return (
      <div style={{width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems:'center', background: `url(${this.props.gif}) no-repeat center center fixed`,
      backgroundSize: 'cover'}}>
       
       <button style={{position: 'absolute', margin: '0 auto', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', fontSize: '2rem', color: 'white', fontWeight: 'bold', background: '#27ae60', borderRadius: '2rem', border: 'none', outline: 'none', padding: '.5rem 2.5rem'}} onClick={this.submitGIF.bind(this)}>Submit</button>
       <button style={{position: 'absolute', margin: '0 auto', top: '1rem', left: '1rem', backgroundColor: '#e74c3c', outline: 'none', border: 'none', height: '2rem', width: '2rem', borderRadius: '50%',fontSize: '1rem', color: 'white', fontWeight: 'bold'}} onClick={this.props.exit.bind(this)}>X</button>
      </div>
    );
  }
}

export default GIFPreview;
