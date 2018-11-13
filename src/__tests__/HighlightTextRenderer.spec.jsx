import React from "react";
import { mount } from "enzyme";
import HighlightTextRenderer from "../components/HighlightTextRenderer";

describe("Test HighlightTextRenderer", () => {
  it("Highlight match with strong tag", () => {
    expect(
      mount(<HighlightTextRenderer searchText="tr" value="Myntra" />)
        .find("strong")
        .text()
    ).toBe("tr");
  });
  it("No highlight for unmatched text", () => {
    expect(
      mount(<HighlightTextRenderer searchText="abc" value="Myntra" />).find(
        "strong"
      )
    ).toHaveLength(0);
  });
});
