import React from "react";
import AddShoppingListItem from "../components/addShoppinglistItem";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("matches", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { id: 1 } }
  };
  const add = shallow(<AddShoppingListItem {...props} />);
  expect(shallowToJson(add)).toMatchSnapshot();
});

it("renders without crashing", () => {
  const props = {
    history: { push: jest.fn() },
    match: { params: { id: 1 } }
  };
  shallow(<AddShoppingListItem {...props} />);
});

// it("updates state on input change", () => {
//   const wrapper = shallow(<AddShoppingListItem />);
//   const name = wrapper.find("#name");
//   name.simulate("change", {
//     target: { name: "name", value: "arthur" }
//   });
//
//   expect(wrapper.state().name).toEqual("arthur");
// });
//
// it("adds item", () => {
//   const wrapper = shallow(<AddShoppingListItem />);
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
