import React, { Component } from 'react';
// import './App.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      query: ""
    }
    this.search = this.search.bind(this);
    this.saveQuery = this.saveQuery.bind(this);
  }

  search(event) {
    const query = this.state.query;
    const results = [
      {id: query + 'id1', name: query + "1"},
      {id: query + 'id2', name: query + "2"},
    ];
    event.preventDefault();
    this.setState({
      results
    });
  }

  saveQuery(event) {
    this.setState({
      query: event.target.value
    })
  }

  results() {
    return this.state.results.map(r => (
      <div key={r} data-testid="result" data-name={r.name}>
        {r.name}
        <button data-testid="addBtn" onClick={() => this.props.add(r)}>Add</button>
    </div>
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.search}>
          <input onChange={this.saveQuery} type="text" data-testid="search" required/>
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
