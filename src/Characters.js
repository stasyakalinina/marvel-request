import React from 'react';
import ShowCharacters from './ShowCharacters';
import './Characters.css';

const Characters = (props) => (
  <div data-testid="characters">
    {props.chars.length > 0
      ? <ShowCharacters chars={props.chars} removeCharacter={props.removeCharacter} />
      : <p className="characters__text-no">No characters</p>
    }
  </div>
);
export default Characters;
