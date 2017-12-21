import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("renders without crashing", () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  shallow(<App />);
});

it("matches", () => {
  const edit = shallow(<App />);
  expect(shallowToJson(edit)).toMatchSnapshot();
});
