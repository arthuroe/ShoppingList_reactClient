import React from "react";
import Login from "../components/login";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

it("matches", () => {
  const login = shallow(<Login />);
  expect(shallowToJson(login)).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<Login />);
});

it("should have a username and password input field", () => {
  const wrapper = shallow(<Login />);
  expect(wrapper.find("#email").length).toEqual(1);
  expect(wrapper.find("#password")).toHaveLength(1);
});

it("should have correct input field types", () => {
  const wrapper = shallow(<Login />);
  expect(wrapper.find("#email[type='email']").length).toEqual(1);
  expect(wrapper.find("#password[type='password']").length).toEqual(1);
});

it("should have values credentials entered correctly", () => {
  const credentials = { email: "arthur@gmail.com", password: "arthur" };
  const wrapper = shallow(<Login />);
  expect(wrapper.find("#email")).toHaveLength(1);
  expect(wrapper.find("#password")).toHaveLength(1);

  const email = wrapper.find("#email");
  email.value = credentials.email;
  expect(email.value).toEqual("arthur@gmail.com");

  const password = wrapper.find("#password");
  password.value = credentials.password;
  expect(password.value).toEqual("arthur");
});

it("updates state on input change", () => {
  const wrapper = shallow(<Login />);
  const email = wrapper.find("#email");
  const password = wrapper.find("#password");
  email.simulate("change", {
    target: { name: "email", value: "arthur@gmail.com" }
  });
  password.simulate("change", {
    target: { name: "password", value: "secret" }
  });

  expect(wrapper.state().email).toEqual("arthur@gmail.com");
  expect(wrapper.state().password).toEqual("secret");
});

it("signs in user", () => {
  const wrapper = shallow(<Login />);
  const email = wrapper.find("#email");
  const password = wrapper.find("#password");

  email.simulate("change", {
    target: { name: "email", value: "arthur@gmail.com" }
  });
  password.simulate("change", {
    target: { name: "password", value: "secret" }
  });

  expect(wrapper.state().email).toEqual("arthur@gmail.com");
  expect(wrapper.state().password).toEqual("secret");
  const submit = wrapper.find('[type="submit"]');
  submit.simulate("submit");
});
