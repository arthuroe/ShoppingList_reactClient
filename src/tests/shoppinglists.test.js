import React from "react";
import ShoppingLists from "../components/shoppinglists";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

mockAxios
  .onGet("http://localhost:5000/api/v1/shoppinglists")
  .reply(200, { shoppinglists: [{ id: 1, name: "one" }] });

const props = {
  history: { push: jest.fn() }
};

it("renders without crashing", () => {
  shallow(<ShoppingLists {...props} />);
});

it("matches", () => {
  const shoppinglists = shallow(<ShoppingLists {...props} />);
  expect(shallowToJson(shoppinglists)).toMatchSnapshot();
});
