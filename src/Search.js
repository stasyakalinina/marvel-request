import React, { Component } from 'react';
// import './App.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null
    }
    this.search = this.search.bind(this);
  }

  search(event) {
    const query = event.target.value;
    const results = [query, query];
    event.preventDefault();
    this.setState({
      results
    });
  }

  results() {
    
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.search}>
          <input type="text" data-testid="search" required/>
          <button data-testid="searchBtn">Add</button>
        </form>
        {this.state.results
          ? <div data-testid="searchRes">{this.results()}</div>
          : null
        }
      </div>
    );
  }
}

export default Search;
