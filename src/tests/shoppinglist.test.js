import React from "react";
import ShoppingList from "../components/shoppinglist";
import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

it("matches", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { id: 1 } },
    shoppinglist: { id: 1, name: "one" }
  };
  const shoppinglist = shallow(<ShoppingList {...props} />);
  expect(shallowToJson(shoppinglist)).toMatchSnapshot();
});

it("renders without crashing", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { id: 1 } },
    shoppinglist: { id: 1, name: "one" }
  };
  shallow(<ShoppingList {...props} />);
});

mockAxios
  .onDelete("http://localhost:5000/api/v1/shoppinglists/1")
  .reply(200, { data: { message: "list deleted" } });

it("deletes on click delete", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { id: 1 } },
    shoppinglist: { id: 1, name: "one" }
  };
  const component = shallow(<ShoppingList {...props} />);
  const deleteBtn = component.find("button.red");
  deleteBtn.simulate("click");
});
