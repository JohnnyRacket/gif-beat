import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import secrets from './secrets/config.json';
import * as QRCode from 'qrcode.react';

class PlayGIFScreen extends Component {

  state = {
    video: null,
    gifs: [],
    index: 0,
    progress: 0,
    bpm: 60,
    multi: true,
    flip: false,
    getGifs: null,
    changeGifs: null
  }

  componentDidMount(){
    this.getGIFs();
    let getGifs = setInterval(() => {
        this.getGIFs();
    }, 60000);
    let changeGifs = setInterval(() => {
        this.changeGIF();
    }, 15000);
    this.setState({getGifs: getGifs, changeGifs: changeGifs});
  }

  componentWillUnmount(){
    clearInterval(this.state.getGifs);
    clearInterval(this.state.changeGifs);
    this.setState({getGifs: null, changeGifs: null});
  }

  changeGIF(){
    this.setState({index: Math.floor(this.state.gifs.length * Math.random()), multi: (Math.random() >= 0.5), flip: (Math.random() >= 0.5)})
  }
  async getGIFs(){
    //await Axios.get(`https://imgur.com/a/${this.this.props.match.params.albumid}`);
    let res = await Axios.get(`https://api.imgur.com/3/album/${this.props.match.params.albumid}`, {headers: {Authorization: "Client-ID " + secrets.imgur.client_id}});
    let gifs = res.data.data.images;
    //console.log(gifs);
    this.setState({gifs: gifs});
  }

  render() {
    return (
      <div className="App" style={{height: '100vh', width: '100vw'}}>
          {this.state.gifs.length > 0 ? <div style={{width: '100%', height: '100%', minHeight: '100vh', transform: `scale(${this.state.flip ? -1 : 1})`, background: `url(${this.state.gifs[this.state.index].link}) ${this.state.multi ? 'center center / cover' : ''}`}} /> : ""}
          {this.props.deletehash? <QRCode value={`https://johnnyracket.github.io/gif-beat/#/record/${this.props.deletehash}`}  style={{position: 'absolute', bottom: '1rem', right: '1rem', padding: '.5rem', background: 'white'}}/> : "" }
      </div>
    );
  }
}

export default PlayGIFScreen;
