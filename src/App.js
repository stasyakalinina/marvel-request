import React, { Component } from 'react';
import Search from './Search';
import Characters from './Characters';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: []
    }
    this.addCharacter = this.addCharacter.bind(this);
  }

  addCharacter(character) {
    this.setState({
      characters: this.state.characters.concat([character])
    });
  }

  render() {
    return (
      <div className="App">
        <Characters chars={this.state.characters}/>
        <Search add={this.addCharacter}/>
      </div>
    );
  }
}

export default App;
