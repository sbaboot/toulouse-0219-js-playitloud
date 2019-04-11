import React from 'react';

export default class AlbumDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      albumsInfos: '',
      tracks: []
    }
    this.apiCallById = this.apiCallById.bind(this);
  }
  convertTime = (MS) => {
    const minute = (MS / 60000).toFixed(0);
    const second = ((MS % 60000) / 1000).toFixed(0);
    return `${minute} min ${second} s`;
  }
  convertdate = (p) => {
    const us = p.split("-");
    const year = us[0];
    const day = us[2];
    const month = us[1];
    return `${day} / ${month} / ${year}`;
  }
  componentDidMount() {
    this.apiCallById();
  }

  apiCallById() {
    fetch(`https://api.spotify.com/v1/albums/${this.props.match.params.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          albumsInfos: data

        });
      });

  }

  render() {

    return (
      <div className="main" style={{ color: 'white' }}>
        {this.state.albumsInfos && <img src={this.state.albumsInfos.images[1].url} alt="pictures" />}
        < h3 > {this.state.albumsInfos.name}</h3 >
        {this.state.albumsInfos && <p>{this.state.albumsInfos.artists[0].name}</p>}
        < p > Label : {this.state.albumsInfos.label}</p >
        <p>Date de sortie : {this.convertdate("2018-08-31")}</p>
        <p>{this.state.albumsInfos.total_tracks} titre(s)</p>
        <p>Popularité : {this.state.albumsInfos.popularity}%</p>
        {
          this.state.albumsInfos && this.state.albumsInfos.tracks.items.map((singleTrack, i) =>
            <div>
              <p key={i}>{singleTrack.track_number}. {singleTrack.name} {this.convertTime(singleTrack.duration_ms)}</p>
            </div>)
        }
      </div >
    );
  };
}
