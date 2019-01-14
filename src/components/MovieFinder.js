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
      this.errorMessage = this.errorMessage.bind(this);
    }
    componentDidMount(){
      this.titleInput.focus(); 
   }
    handleChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;
  
      this.setState((prevState) => {
        prevState.movieRequest[name] = value;
        return { movieRequest: prevState.movieRequest };
      });
    }

    handleClick = api => e => {
      e.preventDefault();
  
      this.setState({ loading: true });
      if((this.state.movieRequest.title !== '')){
      const params = '{"title":"'+this.state.movieRequest.title+
                    '","year":"'+this.state.movieRequest.year+'"}';
      fetch('/.netlify/functions/' + api + '?params=' + params)
        .then(response => response.json())
        .then(json => {
          this.setState({ loading: false, movieData: JSON.stringify(json.movieData) });
        });
      }
      else {
        alert('Please enter the movie title!');
        this.titleInput.focus(); 
        this.setState({ loading: false });
      }
    };

    errorMessage = ( movieData) => {
      if(movieData != null)
      {
        this.titleInput.focus(); 
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
            <div className="form-row">
            <div className="col-md-6">               
              <input
                type="text"
                placeholder="Title"
                value={this.props.movieTitle}
                name="title"
                onChange={this.handleChange}
                className="form-control"
                ref={(inputTitle) => { this.titleInput = inputTitle; }} 
              />
              <small class="form-text text-muted">
                Ex: Sully, Vice,...
              </small>
              </div> 
    <div className="col-md-3">
              <input
                type="text"
                checked={this.props.movieYear}
                placeholder="Year"
                name="year"
                onChange={this.handleChange}
                className="form-control"/>
              <small class="form-text text-muted">
                Ex: 2016, 2018,...
              </small>
                </div>
                  <div className="col-md-3">
                <button 
                  type="button" 
                  className="btn btn-primary form-control"
                  onClick={this.handleClick('getmovie')}>
                  {loading ? 'Loading...' : 'Search Movie Data'}
                </button>
                </div>
                </div>
            </form>
          </div>
          {this.errorMessage( movieData)}
        </div>
      );
    }
  }
  
  export default MovieFinder;