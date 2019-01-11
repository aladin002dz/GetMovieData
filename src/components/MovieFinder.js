import React, { Component } from 'react'
import './MovieFinder.css'
import DisplayMovieData from './DisplayMovieData'

class MovieFinder extends Component {
    constructor(props) {
      super(props);
      this.state = { loading: false, movieData: null };
    }
  
    handleClick = api => e => {
      e.preventDefault();
  
      this.setState({ loading: true });
      const params = '{"title":"vice","year":"2018"}';
      fetch('/.netlify/functions/' + api + '?params=' + params)
        .then(response => response.json())
        .then(json => {
          this.setState({ loading: false, movieData: JSON.stringify(json.movieData) });
   //console.log(json);
        });
    };
  
    render() {
  
      const { loading, movieData } = this.state;
  
      return (
        <div>
      <form>
        <label className="control-label">Title:</label>                   
        <input
          type="text"
          placeholder="Title"
          value={this.props.movieTitle}
          name="movieTitle"
          onChange={this.handleChange}
          className="input-small"
        />
        <label className="control-label">Year:</label>
        <input
          type="text"
          checked={this.props.movieYear}
          placeholder="Year"
          name="movieYear"
          onChange={this.handleChange}
          className="input-small"
          style={{width:'100px'}}
        />
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={this.handleClick('getmovie')}>
            {loading ? 'Loading...' : 'Get Movie'}
          </button>
      </form>
          <DisplayMovieData movieData = { JSON.parse(movieData) }/>
          <div>
              { movieData }
          </div>
        </div>
      );
    }
  }
  
  export default MovieFinder;