import React from "react";
import AddShoppingList from "../components/addShoppinglist";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("matches", () => {
  const add = shallow(<AddShoppingList />);
  expect(shallowToJson(add)).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<AddShoppingList />);
});

// it("updates state on input change", () => {
//   const wrapper = shallow(<AddShoppingList />);
//   const name = wrapper.find("#name");
//   name.simulate("change", {
//     target: { name: "name", value: "arthur" }
//   });
//
//   expect(wrapper.state().name).toEqual("arthur");
// });
//
// it("adds item", () => {
//   const wrapper = shallow(<AddShoppingList />);
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
