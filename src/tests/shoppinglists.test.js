import React from "react";
import ShoppingLists from "../components/shoppinglists";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

mockAxios.onGet("http://localhost:5000/api/v1/shoppinglists").reply(200, {
  shoppinglists: [{ id: 1, name: "one" }]
});

const props = {
  history: { push: jest.fn() }
};

const data = {
  current: 1,
  next: 2,
  pages: 2,
  shoppinglists: [{ id: 1, name: "one" }]
};

it("renders without crashing", () => {
  const data = {
    current: 1,
    next: 2,
    pages: 2,
    shoppinglists: [{ id: 1, name: "one" }]
  };
  shallow(<ShoppingLists {...props} />);
});

it("matches", () => {
  const data = {
    current: 1,
    next: 2,
    pages: 2,
    shoppinglists: [{ id: 1, name: "one" }]
  };
  const shoppinglists = shallow(<ShoppingLists {...props} />);
  expect(shallowToJson(shoppinglists)).toMatchSnapshot();
});
