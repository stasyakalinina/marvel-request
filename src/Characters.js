import React from 'react';

const Character = (props) => {
  return <div data-testid="character">{props.character.name}</div>
};

const ShowCharacters = (props) => (
  props.chars.map(character => (
    <Character key={character.id} character={character}/>
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
