import React from "react";
import Search from "../components/search";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("matches", () => {
  const main = shallow(<Search />);
  expect(shallowToJson(main)).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<Search />);
});
