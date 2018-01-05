import React from "react";
import EditShoppingList from "../components/editShoppinglist";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

mockAxios
  .onPut(`http://localhost:5000/api/v1/shoppinglists/1`)
  .reply(200, { message: "Item updated" });

const props = {
  history: { push: jest.fn() },
  match: { params: { listid: 1, id: 1 } }
};

it("renders without crashing", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { id: 1 } }
  };
  shallow(<EditShoppingList {...props} />);
});

it("matches", () => {
  const edit = shallow(<EditShoppingList {...props} />);
  expect(shallowToJson(edit)).toMatchSnapshot();
});

// it("updates state on input change", () => {
//   const wrapper = shallow(<EditShoppingList {...props} {...state} />);
//   const name = wrapper.find("#name");
//   name.simulate("change", {
//     target: { name: "name", value: "arthur" }
//   });
//
//   expect(wrapper.state().name).toEqual("arthur");
// });
//
// it("it edits", () => {
//   const wrapper = shallow(<EditShoppingList {...props} />);
//   const item = wrapper.find("#name");
//
//   item.simulate("change", {
//     target: { name: "name", value: "arthur" }
//   });
//
//   expect(wrapper.state().name).toEqual("arthur");
//   const submit = wrapper.find('[type="submit"]');
//   submit.simulate("submit");
// });
