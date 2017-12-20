import React from "react";
import ResetPassword from "../components/reset-password";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("matches", () => {
  const reset = shallow(<ResetPassword />);
  expect(shallowToJson(reset)).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<ResetPassword />);
});

it("updates state on input change", () => {
  const wrapper = shallow(<ResetPassword />);
  const name = wrapper.find("#email");
  name.simulate("change", {
    target: { name: "email", value: "arthur@gmail.com" }
  });

  expect(wrapper.state().email).toEqual("arthur@gmail.com");
});

it("it resets", () => {
  const wrapper = shallow(<ResetPassword />);
  const item = wrapper.find("#email");

  item.simulate("change", {
    target: { name: "email", value: "arthur@gmail.com" }
  });

  expect(wrapper.state().email).toEqual("arthur@gmail.com");
  const submit = wrapper.find('[type="submit"]');
  submit.simulate("submit");
});
