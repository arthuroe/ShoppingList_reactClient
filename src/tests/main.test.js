import React from "react";
import Main from "../components/main";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("matches", () => {
  const main = shallow(<Main />);
  expect(shallowToJson(main)).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<Main />);
});
