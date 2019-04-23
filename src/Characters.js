import React from 'react';
import './Characters.css';

const Character = (props) => (
  <div data-testid="character">
    {props.character.name}
    <img
      data-testid="picture"
      alt={props.character.name}
      src={props.character.thumbnail.path + "."+ props.character.thumbnail.extension}
    />
    <p
      data-testid="descr">{props.character.description}
    </p>
  </div>
);

const ShowCharacters = (props) => (
  props.chars.map(character => (
    <Character key={character.id} character={character} />
  ))
);

const Characters = (props) => (
  <div data-testid="characters" className="characters-btn">
    {props.chars.length > 0
      ? <ShowCharacters chars={props.chars} />
      : "No characters"
    }
  </div>
);
export default Characters;
