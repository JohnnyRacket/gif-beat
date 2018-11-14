import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import secrets from './secrets/config.json';

class PlayGIFScreen extends Component {

  state = {
    video: null,
    gifs: [],
    index: 0,
    progress: 0,
    bpm: 60,
    pingpong: true
  }

  componentDidMount(){
      this.getGIFs();
    setInterval(() => {
        this.getGIFs();
    }, 300000);
    setInterval(() => {
        this.setState({index: Math.floor(this.state.gifs.length * Math.random()), pingpong: (Math.random() >= 0.5)})
    }, 20000);
  }

  async getGIFs(){
    let res = await Axios.get(`https://api.imgur.com/3/album/${this.props.albumId}`, {headers: {Authorization: "Client-ID " + secrets.imgur.client_id}});
    let gifs = res.data.data.images;
    console.log(gifs);
    this.setState({gifs: gifs});
  }

  render() {
    return (
      <div className="App" style={{height: '100vh', width: '100vw'}}>
          {this.state.gifs.length > 0 ? <x-gif fill ping-pong={this.state.pingpong} bpm={this.state.bpm} src={this.state.gifs[this.state.index].link}></x-gif> : <x-gif fill src="https://i.imgur.com/IUNMjf1.gif"></x-gif>}
      </div>
    );
  }
}

export default PlayGIFScreen;
