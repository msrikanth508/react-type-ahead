import React from "react";
import { shallow, mount } from "enzyme";
import ItemRenderer from "../components/ItemRenderer";

describe("Test ItemRenderer Component", () => {
  it("Test appending active classname", () => {
    expect(
      shallow(
        <ItemRenderer position={0} activeIndex={0} onClick={() => {}}>
          <div> Item1 </div>
        </ItemRenderer>
      ).find(".active")
    ).toHaveLength(1);
  });

  it("Test appending active classname ", () => {
    expect(
      shallow(
        <ItemRenderer position={0} activeIndex={-1} onClick={() => {}}>
          <div> Item1 </div>
        </ItemRenderer>
      ).find(".active")
    ).toHaveLength(0);
  });

  it("Test click event", () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ItemRenderer position={0} activeIndex={0} onClick={fn}>
        <div> Item1 </div>
      </ItemRenderer>
    );

    wrapper.find(".active").simulate("click");

    expect(fn).toHaveBeenCalled();
  });
});
