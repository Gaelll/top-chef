import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import restau from './test-react.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Find the best promotion</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <ul>
        {
          restau.map(function(restaurant){
            return <li>{restaurant.name} - {restaurant.address}</li>;
          })
        }
        </ul>
      </div>

    );
  }
}

export default App;
