import React, { Component } from 'react';
import './App.css';
import  MovieFinder from './components/MovieFinder';

class App extends Component {
  render() {
    return (
      <div className="App">
          <MovieFinder />
      </div>
    );
  }
}

export default App;
