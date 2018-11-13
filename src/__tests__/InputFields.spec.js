import React from "react";
import { shallow } from "enzyme";
import InputFields from "../components/InputFields";

describe("Test InputFields Component", () => {
  it("Check main input field value", () => {
    expect(
      shallow(
        <InputFields
          frontInputValue="Ind"
          backInputValue="India"
          inputRef={() => {}}
        />
      )
        .find("input")
        .at(0)
        .prop("value")
    ).toBe("Ind");
  });

  it("Check shadow input field value", () => {
    expect(
      shallow(
        <InputFields
          frontInputValue="Ind"
          backInputValue="India"
          inputRef={() => {}}
        />
      )
        .find("input")
        .at(1)
        .prop("value")
    ).toBe("India");
  });
});
