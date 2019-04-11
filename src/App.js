import React, { Component } from 'react';
import Search from './Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div data-testid="characters">
          No characters
        </div>
        <Search />
      </div>
    );
  }
}

export default App;
