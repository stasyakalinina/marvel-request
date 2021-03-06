import React, { Component } from 'react';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

const groupSize= 3;

const Character = (props) => (
  <div data-testid="character" className="character__card">
    <h2 className="character__title" data-testid="name">{props.character.name}</h2>
    <img
      data-testid="picture"
      className="character__image"
      alt={props.character.name}
      src={props.character.thumbnail.path + "." + props.character.thumbnail.extension}
    />
  <button
    data-testid="removeCharacter"
    className="character__close"
    onClick={ () => props.removeCharacter(props.character.id) }
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 35 35">
        <circle cx="17.5" cy="17.5" r="16.5" fill="#E86165" stroke="#E86165" strokeWidth="2"/>
        <path fill="#fff" d="M25 12.41L23.59 11 18 16.59 12.41 11 11 12.41 16.59 18 11 23.59 12.41 25 18 19.41 23.59 25 25 23.59 19.41 18 25 12.41z"/>
      </svg>
    </button>
  </div>
);

class ShowCharacters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }

    this.switchPage = this.switchPage.bind(this);
  }


  groupChars() {
    let groups = [];

    for (let i= 0; i < this.props.chars.length; i += groupSize) {
      groups.push({ id: i/groupSize, chars: this.props.chars.slice(i, i + groupSize) });
    }

    return groups;
  }

  getMaxPage() {
    return parseInt(this.props.chars.length/groupSize);
  }

  switchPage() {
    const maxPage = this.getMaxPage();
    const nextPage = this.state.page >= maxPage ? 0 : this.state.page + 1;

    this.setState({
      page: nextPage
    });
  }

  renderPage(chars, page) {
    const show = page === this.state.page ? 'visible' : 'hidden';
    return (
      <div className={`${show} characters__list`} data-testid={`page-${show}`} key={page}>
        {
          chars.map(c => (
            <Character key={c.id} character={c} removeCharacter={this.props.removeCharacter} />
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.groupChars().map(group => (this.renderPage(group.chars, group.id)))}
        {this.getMaxPage() > 0 ? <ArrowLeft /> : null}
        {this.getMaxPage() > 0 ? <ArrowRight /> : null}
      </div>
    )
  }
}

export default ShowCharacters;
