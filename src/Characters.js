import React from 'react';
import './Characters.css';

const Character = (props) => (
  <div data-testid="character" className="characters__card">
    <h2 className="characters__title">{props.character.name}</h2>
    <img
      data-testid="picture"
      className="characters__image"
      alt={props.character.name}
      src={props.character.thumbnail.path + "."+ props.character.thumbnail.extension}
    />
  </div>
);

const ShowCharacters = (props) => (
  props.chars.map(character => (
    <Character key={character.id} character={character} />
  ))
);

const Characters = (props) => (
  <div data-testid="characters" className="characters__list">
    {props.chars.length > 0
      ? <ShowCharacters chars={props.chars} />
      : <p className="characters__text-no">No characters</p>
    }
  </div>
);
export default Characters;
