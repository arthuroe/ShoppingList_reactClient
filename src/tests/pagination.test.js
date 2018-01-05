import React from "react";
import Pagination from "../components/pagination";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("matches", () => {
  const main = shallow(<Pagination />);
  expect(shallowToJson(main)).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<Pagination />);
});
