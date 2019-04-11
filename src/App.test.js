import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect';
import App from './App';

afterEach(cleanup);

test('renders without crashing', () => {
  const { getByTestId, queryByTestId, queryAllByTestId } = render(<App/>);
  expect(getByTestId("characters")).toHaveTextContent("No characters");
  expect(getByTestId("search")).toBeTruthy();
  expect(getByTestId("searchBtn")).toBeTruthy();
  expect(queryByTestId("searchRes")).toBeNull();

  const search = getByTestId("search");
  fireEvent.change(search, {target: {value: "Capitan"}});
  const button = getByTestId("searchBtn");
  fireEvent.click(button);
  expect(getByTestId("searchRes")).toBeTruthy();

  const results = queryAllByTestId("result");
  expect(results).not.toHaveLength(0);
  results.forEach(result => {
    expect(result.dataset.name).toContain("Capitan");
  })
});
