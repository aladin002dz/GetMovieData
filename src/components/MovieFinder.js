//import React, { Component } from 'react'
import React, { useState, useEffect } from "react";
import './MovieFinder.css'
import DisplayMovieData from './DisplayMovieData'


export default function MovieFinder() {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestYear, setRequestYear] = useState('');

  let handleSubmit = api => e => {
    e.preventDefault();
    console.debug("submit");
    setLoading(true);
    if((requestTitle !== '')){
    const params = '{"title":"'+requestTitle+
                  '","year":"'+requestYear+'"}';
    fetch('/.netlify/functions/' + api + '?params=' + params)
      .then(response => response.json())
      .then(json => {
        //this.setState({ loading: false, movieData: JSON.stringify(json.movieData) });
        console.debug("response:");
        console.debug(JSON.stringify(json.movieData))
        setMovieData(JSON.stringify(json.movieData));
        setLoading(false);
      });
    }
    else {
      alert('Please enter the movie title!');
      this.titleInput.focus(); 
      //this.setState({ loading: false });
      setLoading(false);
    }
  };

  let errorMessage = (movieData) => {
    if(movieData !== null)
    {
      let response = JSON.parse(movieData);
      if(response["Response"] !== 'True')
      {
        movieData = null;
        this.titleInput.focus(); 
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
  
  return (
    <div>
      <div className="search-panel mt-3">
        <form onSubmit={handleSubmit('getmovie')}>  
        <div className="form-row">
        <div className="col-md-6">               
          <input
            type="text"
            placeholder="Title"
            value={requestTitle}
            name="title"
            onChange={e => setRequestTitle(e.target.value)}
            className="form-control"
            disabled = {loading}
          />
          <small className="form-text text-muted">
            Ex: Sully, Vice,...
          </small>
          </div> 
        <div className="col-md-3">
          <input
            type="text"
            checked={requestYear}
            placeholder="Year"
            name="year"
            onChange={e => setRequestYear(e.target.value)}
            className="form-control"
            disabled = {loading}
            />
          <small className="form-text text-muted">
            Ex: 2016, 2018,...
          </small>
            </div>
        <div className="col-md-3">
            <input type="submit" 
              className="btn btn-primary form-control"
              value={loading ? 'Loading...' : 'Search Movie Data'}/>
            </div>
          </div>
        </form>
      </div>
      {errorMessage( movieData)}
    </div>
  );
}
  