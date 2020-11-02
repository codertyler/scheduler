import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("should render without crashing", () => {
  render(<Application />);
});
