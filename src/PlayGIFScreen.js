import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import secrets from './secrets/config.json';

class PlayGIFScreen extends Component {

  state = {
    video: null,
    gifs: [],
    progress: 0,
    bpm: 60,
    pingpong: true
  }

  componentDidMount(){
      this.getGIFs();
  }

  async getGIFs(){
    let res = await Axios.get(`https://api.imgur.com/3/album/${this.props.albumId}`, {headers: {Authorization: "Client-ID " + secrets.imgur.client_id}});
    let gifs = res.data.data.images;
    console.log(gifs)
    this.setState({gifs: gifs});
  }

  render() {
    return (
      <div className="App">
          {this.state.gifs.length > 0 ? <x-gif ping-pong={this.state.pingpong} bpm={this.state.bpm} src={this.state.gifs[5].link}></x-gif> : <x-gif src="https://i.imgur.com/IUNMjf1.gif"></x-gif>}
      </div>
    );
  }
}

export default PlayGIFScreen;
