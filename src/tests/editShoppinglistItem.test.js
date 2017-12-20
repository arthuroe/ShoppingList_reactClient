import React from "react";
import EditShoppingListItem from "../components/editShoppinglistItem";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

mockAxios.onPut(`http://localhost:5000/api/v1/shoppinglists/1`).reply(200);

const props = {
  history: { push: jest.fn() },
  match: { params: { listid: 1, id: 1 } }
};

it("renders without crashing", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { id: 1 } }
  };
  shallow(<EditShoppingListItem {...props} />);
});
//
// it("matches", () => {
//   const edit = shallow(<EditShoppingListItem {...props} />);
//   expect(shallowToJson(edit)).toMatchSnapshot();
// });
//
// it("updates state on input change", () => {
//   const wrapper = shallow(<EditShoppingListItem {...props} />);
//   const name = wrapper.find("#name");
//   name.simulate("change", {
//     target: { name: "name", value: "arthur" }
//   });
//
//   expect(wrapper.state().name).toEqual("arthur");
// });
//
// // it("it edits", () => {
// //   const wrapper = shallow(<EditShoppingListItem {...props} />);
// //   const item = wrapper.find("#name");
// //
// //   item.simulate("change", {
// //     target: { name: "name", value: "arthur" }
// //   });
// //
// //   expect(wrapper.state().name).toEqual("arthur");
// //   const submit = wrapper.find('[type="submit"]');
// //   submit.simulate("submit");
// // });
