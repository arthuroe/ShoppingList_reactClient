import React from "react";
import { shallow } from "enzyme";
import ShoppingListItems from "../components/shoppinglistItems";
import { shallowToJson } from "enzyme-to-json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

mockAxios
  .onGet(`http://localhost:5000/api/v1/shoppinglists/1/items`)
  .reply(200, { items: [] });

const props = {
  history: { push: jest.fn() },
  match: { params: { id: 1 } }
};

it("renders without crashing", () => {
  shallow(<ShoppingListItems {...props} />);
});

it("matches", () => {
  const items = shallow(<ShoppingListItems {...props} />);
  expect(shallowToJson(items)).toMatchSnapshot();
});
