import React from "react";
import { mount } from "enzyme";
import MenuRenderer from "../components/MenuRenderer";
import HighlightTextRenderer from "../components/HighlightTextRenderer";

const data = [
  {
    label: "Afghanistan",
    id: 0
  },
  {
    label: "Albania",
    id: 1
  },
  {
    label: "Algeria",
    id: 2
  },
  {
    label: "Andorra",
    id: 3
  }
];

describe("Test MenuRenderer Component", () => {
  it("Check rendering options length", () => {
    expect(
      mount(
        <MenuRenderer
          items={data}
          activeIndex={-1}
          renderItem={(option, props) => (
            <HighlightTextRenderer searchText="" value={option.label} />
          )}
        />
      ).find(".typeahead-item")
    ).toHaveLength(data.length);
  });
  it("Check custom no results data message", () => {
    expect(
      mount(
        <MenuRenderer items={[]} activeIndex={-1} noResultsMessage="no data" />
      )
        .find(".no-results")
        .at(0)
        .text()
    ).toBe("no data");
  });

  it("Check onItemSelected event", () => {
    const fn = jest.fn();
    const wrapper = mount(
      <MenuRenderer
        items={data}
        activeIndex={0}
        onItemSelected={fn}
        renderItem={(option, props) => (
          <HighlightTextRenderer searchText="" value={option.label} />
        )}
      />
    );

    wrapper.find(".active").simulate("click");

    expect(fn).toHaveBeenCalled();
  });
});
