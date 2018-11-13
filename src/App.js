import React, { Component } from 'react';
import './App.css';
import CaptureGIFScreen from './CaptureGIFScreen';
import PlayGIFScreen from './PlayGIFScreen';
import Axios from 'axios';
import secrets from './secrets/config.json';
import bg from './pattern.svg';

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



  render() {
    return (
      <div style={{width: '100%', height: '100vh', padding: '4rem 1rem',background: `URL(${bg})`, boxSizing: 'border-box' }}>
        {!this.state.captureScreen && !this.state.hostScreen ? (
        <div>
          
          <div style={{display:'flex', flexDirection: 'column', width: '100%', maxWidth: '20rem', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 0 90px 60px #fff', boxSizing: 'border-box'}}>
          <h1 style={{color:'#f0932b', fontWeight: 'bold', fontSize: '5rem', textAlign: 'center', margin: '1rem 0 2rem'}}>Gif Beat</h1>
            <input onChange={e => this.setState({albumId: e.target.value})} placeholder='ID Here...' style={{fontSize: '3rem', borderRadius: '.5rem', border: 'solid 4px #f0932b', padding: '.25rem .5rem', outline: 'none'}}></input>
            <div style={{display: 'flex', flexDirection: 'row', margin: '1rem 0'}}>
              <button onClick={() => {}} style={{marginRight: '1rem', fontSize: '2rem', flex : 1, background:'#f0932b', padding: '1rem 0', borderRadius: '.5rem', border: 'none', fontWeight: 'bold', color: 'white', cursor: 'pointer'}}>Join!</button>
              <button onClick={() => {}} style={{fontSize: '1rem', color: '#f0932b', background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer'}} >Re-Host</button>
            </div>
            <div style={{margin: '0 auto', fontSize: '1.5rem', color: 'lightgrey'}}> or </div>
            <button onClick={() => {this.createAlbum()}} style={{margin: '1rem 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#f0932b', background: 'transparent', outline: 'none', border: 'none', cursor: 'pointer'}}>Create Party</button>
          </div>
        </div>) : "" }
        { this.state.captureScreen ? <CaptureGIFScreen albumId={this.state.albumId} /> : ""}
        { this.state.hostScreen ? <PlayGIFScreen albumId={this.state.albumId} /> : "" }
        { this.state.albumIdModal ? "album id modal" : ""}
      </div>
      
    );}
}

export default App;
