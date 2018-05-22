import React, { Component } from 'react';
import './App.css';
import Interface from './Interface';
import Carte from './Carte';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Interface />
        <Carte />
      </div>
    );
  }
}

export default App;
