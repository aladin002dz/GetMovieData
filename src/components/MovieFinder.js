import React, { Component } from 'react'
import './MovieFinder.css'
import DisplayMovieData from './DisplayMovieData'


const RESET_VALUES = {title: '', year: ''};

class MovieFinder extends Component {
    constructor(props) {
      super(props);
      this.state = { 
                    movie: Object.assign({}, RESET_VALUES),
                    loading: false, 
                    movieData: null };
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;
  
      this.setState((prevState) => {
        prevState.movie[name] = value;
        return { movie: prevState.movie };
      });
    }

    handleClick = api => e => {
      e.preventDefault();
  
      this.setState({ loading: true });
      const params = '{"title":"'+this.state.movie.title+
                    '","year":"'+this.state.movie.year+'"}';
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
          name="title"
          onChange={this.handleChange}
          className="input-small"
        />
        <label className="control-label">Year:</label>
        <input
          type="text"
          checked={this.props.movieYear}
          placeholder="Year"
          name="year"
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
        </div>
      );
    }
  }
  
  export default MovieFinder;