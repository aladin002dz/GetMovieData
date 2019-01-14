import React, { Component } from 'react'
import './MovieFinder.css'
import DisplayMovieData from './DisplayMovieData'


const RESET_VALUES = {title: '', year: ''};

class MovieFinder extends Component {
    constructor(props) {
      super(props);
      this.state = { 
                    movieRequest: Object.assign({}, RESET_VALUES),
                    loading: false, 
                    movieData: null };
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;
  
      this.setState((prevState) => {
        prevState.movieRequest[name] = value;
        return { movie: prevState.movieRequest };
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
        });
    };

    errorMessage( movieData) {
      if(movieData != null)
      {
        let response = JSON.parse(movieData);
        if(response["Response"] != 'True')
        {
          movieData = null;
          return (
            <div>
              <div style={{color:'red', fontSize:'2rem'}}>{response["Error"]}</div>
              <DisplayMovieData movieData = { JSON.parse(movieData) }/>
            </div>
          ) ;
        }
        return <DisplayMovieData movieData = { JSON.parse(movieData) }/>
      }
      return <DisplayMovieData movieData = { JSON.parse(movieData) }/>
  }
  
    render() {
  
      const { loading, movieData } = this.state;


      return (
        <div>
          <div className="search-panel">
            <form>                  
              <input
                type="text"
                placeholder="Title"
                value={this.props.movieTitle}
                name="title"
                onChange={this.handleChange}
                className="form-control"
              />
              <input
                type="text"
                checked={this.props.movieYear}
                placeholder="Year"
                name="year"
                onChange={this.handleChange}
                className="form-control"
                style={{width:'100px'}}
              />
                <button 
                  type="button" 
                  className="btn btn-primary"
                  style={{width:'300px'}}
                  onClick={this.handleClick('getmovie')}>
                  {loading ? 'Loading...' : 'Search Movie Data'}
                </button>
            </form>
          </div>
          {this.errorMessage( movieData)}
        </div>
      );
    }
  }
  
  export default MovieFinder;