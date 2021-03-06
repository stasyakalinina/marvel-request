import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect';
import *as dom from 'dom-testing-library';
import App from './App';
const nextTick = () => new Promise(r => process.nextTick(r));
let capSearchResult = {
  "code": 200,
  "status": "Ok",
  "copyright": "© 2019 MARVEL",
  "attributionText": "Data provided by Marvel. © 2019 MARVEL",
  "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2019 MARVEL</a>",
  "etag": "1b33b6b6c2815dfecab9b79c88759f6f4282115f",
  "data": {
    "offset": 0,
    "limit": 20,
    "total": 19,
    "count": 19,
    "results": [
      {
        "id": 1009220,
        "name": "Captain America",
        "description": "Vowing to serve his country any way he could, young Steve Rogers took the super soldier serum to become America's one-man army. Fighting for the red, white and blue for over 60 years, Captain America is the living, breathing symbol of freedom and liberty.",
        "modified": "2016-09-06T11:37:19-0400",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009220"
      },
      {
        "id": 1009223,
        "name": "Captain Britain",
        "description": "",
        "modified": "2012-01-19T10:15:28-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/9/50/4dbf0e5d57226",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009223"
      },
      {
        "id": 1011190,
        "name": "Captain Cross",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1011190"
      },
      {
        "id": 1011196,
        "name": "Captain Flint",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1011196"
      },
      {
        "id": 1010338,
        "name": "Captain Marvel (Carol Danvers)",
        "description": "",
        "modified": "2019-02-06T18:09:05-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1010338"
      },
      {
        "id": 1011027,
        "name": "Captain Universe",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/4/c0/4c00324c12ba2",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1011027"
      }
    ]
  }
}

afterEach(cleanup);

test('renders without crashing', async () => {
  const { getByTestId, queryByTestId, queryAllByTestId, getAllByTestId } = render(<App/>);
  expect(getByTestId("characters")).toHaveTextContent("No characters");
  expect(getByTestId("search")).toBeTruthy();
  expect(getByTestId("searchBtn")).toBeTruthy();
  expect(queryByTestId("searchRes")).toBeNull();

  window.fetch = jest.fn();
  window.fetch.mockReturnValueOnce(
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(capSearchResult)
    })
  );

  const search = getByTestId("search");
  fireEvent.change(search, {target: {value: "Captain"}});
  const button = getByTestId("searchBtn");
  fireEvent.click(button);
  expect(getByTestId("searchRes")).toBeTruthy();
  expect(getByTestId("searchRes")).toHaveTextContent("Loading...");

  await nextTick();

  // Test that reqest was sent only once
  expect(window.fetch).toBeCalledTimes(1);

  //Expect that reqest was sent with "nameStartsWith=Captain"
  expect(window.fetch).toBeCalledWith(
    expect.stringContaining("nameStartsWith=Captain")
  );

  const results = queryAllByTestId("result");
  expect(results).not.toHaveLength(0);
  results.forEach(result => {
    expect(result.dataset.name).toContain("Captain");
    expect(dom.getByTestId(result, "addBtn")).toBeTruthy();
  });

  //Add the first character
  const buttonRes = getByTestId("addBtn");
  fireEvent.click(buttonRes);

  //Test that buttons for slider are not shown
  const noButton = queryByTestId("btnNext");
  expect(noButton).toBeNull();

  expect(getByTestId("characters")).not.toHaveTextContent("No characters");
  const characters = queryAllByTestId("character");
  expect(characters).toHaveLength(1);
  expect(characters[0]).toHaveTextContent(results[0].dataset.name);

  expect(dom.getByTestId(characters[0], "picture").src).toEqual(
    'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg'
  );

  //Add more characters (all 6): find all add buttons and press them and this add all characters
  const buttons = getAllByTestId("addBtn");
  buttons.slice(1, 6).forEach(item => fireEvent.click(item));

  //Expect that only 3 shown
  const visiblePage = getByTestId("page-visible");
  const charactersNames = dom.getAllByTestId(visiblePage, "name").map(item => item.innerHTML);
  expect(charactersNames).toEqual(["Captain America", "Captain Britain", "Captain Cross"]);

  //Expect that 3 are hidden
  const invisiblePage = getByTestId("page-hidden");
  const charactersNamesInvisible = dom.getAllByTestId(invisiblePage, "name").map(item => item.innerHTML);
  expect(charactersNamesInvisible).toEqual(["Captain Flint", "Captain Marvel (Carol Danvers)", "Captain Universe"]);

  //Find and press ButtonRight
  const btnNext = getByTestId("btnNext");
  // fireEvent.click(btnNext);

  //Expect characters changed


  //Find and press ButtonLeft
  const btnPrevious = getByTestId("btnPrev");
  // fireEvent.click(btnPrevious);

  //Expect characters changed
});
