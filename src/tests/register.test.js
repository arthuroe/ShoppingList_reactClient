import React from "react";
import Register from "../components/register";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

mockAxios.onGet(`http://localhost:5000/api/v1/auth/register`).reply(201, {
  status: "success",
  message: "Successfully registered."
});

it("matches", () => {
  const register = shallow(<Register />);
  expect(shallowToJson(register)).toMatchSnapshot();
});

it("renders without crashing", () => {
  shallow(<Register />);
});

it("should have required input fields", () => {
  const wrapper = shallow(<Register />);
  expect(wrapper.find("#email").length).toEqual(1);
  expect(wrapper.find("#username")).toHaveLength(1);
  expect(wrapper.find("#password")).toHaveLength(1);
});

it("should have correct input field types", () => {
  const wrapper = shallow(<Register />);
  expect(wrapper.find("#email[type='email']").length).toEqual(1);
  expect(wrapper.find("#username[type='text']").length).toEqual(1);
  expect(wrapper.find("#password[type='password']").length).toEqual(1);
});

it("should have values credentials entered correctly", () => {
  const credentials = {
    email: "arthur@gmail.com",
    username: "arthur",
    password: "arthur"
  };
  const wrapper = shallow(<Register />);
  expect(wrapper.find("#username")).toHaveLength(1);
  expect(wrapper.find("#email")).toHaveLength(1);
  expect(wrapper.find("#password")).toHaveLength(1);

  const email = wrapper.find("#email");
  email.value = credentials.email;
  expect(email.value).toEqual("arthur@gmail.com");

  const username = wrapper.find("#username");
  username.value = credentials.username;
  expect(username.value).toEqual("arthur");

  const password = wrapper.find("#password");
  password.value = credentials.password;
  expect(password.value).toEqual("arthur");
});

it("updates state on input change", () => {
  const wrapper = shallow(<Register />);
  const username = wrapper.find("#username");
  const email = wrapper.find("#email");
  const password = wrapper.find("#password");
  username.simulate("change", { target: { name: "name", value: "arthur" } });
  email.simulate("change", {
    target: { name: "email", value: "arthur@gmail.com" }
  });
  password.simulate("change", {
    target: { name: "password", value: "secret" }
  });

  expect(wrapper.state().name).toEqual("arthur");
  expect(wrapper.state().email).toEqual("arthur@gmail.com");
  expect(wrapper.state().password).toEqual("secret");
});

it("signs up user", () => {
  const wrapper = shallow(<Register />);
  const username = wrapper.find("#username");
  const email = wrapper.find("#email");
  const password = wrapper.find("#password");

  username.simulate("change", { target: { name: "name", value: "arthur" } });
  email.simulate("change", {
    target: { name: "email", value: "arthur@gmail.com" }
  });
  password.simulate("change", {
    target: { name: "password", value: "secret" }
  });

  expect(wrapper.state().name).toEqual("arthur");
  expect(wrapper.state().email).toEqual("arthur@gmail.com");
  expect(wrapper.state().password).toEqual("secret");
  const submit = wrapper.find("button.green");
  submit.simulate("submit");
});
