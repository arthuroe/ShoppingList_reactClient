import React from "react";
import { shallow } from "enzyme";
import ShoppingListItem from "../components/shoppinglistItem";
import { shallowToJson } from "enzyme-to-json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

mockAxios
  .onGet(`http://localhost:5000/api/v1/shoppinglists/1/items`)
  .reply(200, { details: [] });

const props = {
  history: { push: jest.fn() },
  match: { params: { id: 1 } },
  shoppinglistItem: { id: 1, name: "one" }
};

it("renders without crashing", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { id: 1 } },
    shoppinglistItem: { id: 1, name: "one" }
  };
  shallow(<ShoppingListItem {...props} />);
});

it("matches", () => {
  const login = shallow(<ShoppingListItem {...props} />);
  expect(shallowToJson(login)).toMatchSnapshot();
});

mockAxios
  .onDelete("http://localhost:5000/api/v1/shoppinglists/1/items/1")
  .reply(200, { message: "item deleted" });

it("deletes on click delete", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { id: 1, listid: 1 } },
    listid: 1,
    shoppinglistItem: { id: 1, name: "one" }
  };
  const component = shallow(<ShoppingListItem {...props} />);
  const deleteBtn = component.find("button.red");
  deleteBtn.simulate("click");
});
