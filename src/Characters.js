import React from 'react';
import './Characters.css';

const Character = (props) => (
  <div data-testid="character" className="character__card">
    <h2 className="character__title">{props.character.name}</h2>
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

const ShowCharacters = (props) => (
  props.chars.map(character => (
    <Character key={character.id} character={character} removeCharacter={props.removeCharacter} />
  ))
);

const Characters = (props) => (
  <div data-testid="characters" className="characters__list">
    {props.chars.length > 0
      ? <ShowCharacters chars={props.chars} removeCharacter={props.removeCharacter} />
      : <p className="characters__text-no">No characters</p>
    }
  </div>
);
export default Characters;
