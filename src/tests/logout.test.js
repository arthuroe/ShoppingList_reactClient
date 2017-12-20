import React from "react";
import Logout from "../components/logout";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

mockAxios.onPost("http://localhost:5000/api/v1/auth/logout").reply(200, {
  status: "success",
  message: "Successfully logged out."
});

const props = {
  history: { push: jest.fn() }
};

it("renders without crashing", () => {
  shallow(<Logout />);
});

it("matches", () => {
  const log = shallow(<Logout />);
  expect(shallowToJson(log)).toMatchSnapshot();
});
