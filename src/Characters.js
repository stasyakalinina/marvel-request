import React from 'react';

const ShowCharacters = (props) => (
  props.chars.map(character => (
    <div key={character.id} data-testid="character">{character.name}</div>
  ))
);

const Characters = (props) => (
  <div data-testid="characters">
    {props.chars.length > 0
      ? <ShowCharacters chars={props.chars} />
      : "No characters"
    }
  </div>
);
export default Characters;
