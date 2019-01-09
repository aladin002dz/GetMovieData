import React, { Component } from 'react';
import './App.css';

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true });
    const params = '{"title":"vice","year":"2018"}';
    fetch('/.netlify/functions/' + api + '?params=' + params)
      .then(response => response.json())
      .then(json => {
        this.setState({ loading: false, msg: JSON.stringify(json.msg) });
        console.log(json);
      });
  };

  render() {

    const { loading, msg } = this.state;

    return (
      <div>
        <button onClick={this.handleClick('getmovie')}>
          {loading ? 'Loading...' : 'Get Movie'}
        </button>
        <div>
            {msg}
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <LambdaDemo />
      </div>
    );
  }
}

export default App;
