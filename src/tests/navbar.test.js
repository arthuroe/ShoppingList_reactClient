import React from "react";
import Navbar from "../components/navbar";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("matches", () => {
  const nav = shallow(<Navbar />);
  expect(shallowToJson(nav)).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<Navbar />);
});
