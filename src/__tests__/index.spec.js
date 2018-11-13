import React from "react";
import { shallow, mount } from "enzyme";
import Typeahead from "../index";

const mockData = [
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

describe("Testing component props", () => {
  it("Test Labelkey prop", () => {
    expect(
      shallow(<Typeahead options={mockData} labelKey="label" />).find(
        ".typeahead-wrapper"
      )
    ).toHaveLength(1);
  });

  it("Test options prop", () => {
    expect(
      mount(
        <Typeahead options={mockData} labelKey="label" attachToBody />
      ).prop("options")
    ).toHaveLength(mockData.length);
  });

  it("Test autoFocus prop", () => {
    expect(
      mount(<Typeahead options={mockData} labelKey="label" autoFocus />)
        .find("input")
        .at(0)
        .prop("autoFocus")
    ).toBe(true);
  });

  it("Test disabled prop", () => {
    expect(
      mount(<Typeahead options={mockData} labelKey="label" disabled />)
        .find("input")
        .at(0)
        .prop("disabled")
    ).toBe(true);
  });

  it("Test placeholder prop", () => {
    expect(
      mount(
        <Typeahead options={mockData} labelKey="label" attachToBody />
      ).prop("attachToBody")
    ).toBe(true);
  });

  it("Test onSelected Prop", () => {
    const fn = jest.fn();
    const wrapper = mount(
      <Typeahead options={mockData} labelKey="label" onSelected={fn} />
    );
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "al" } })
      .simulate("keyDown", { keyCode: 38 });
    wrapper.find(".active").simulate("click");
    expect(wrapper.state("activeIndex")).toBe(1);
    expect(wrapper.prop("onSelected")).toHaveBeenCalled();
  });

  it("Test selectedValue prop", () => {
    const wrapper = mount(
      <Typeahead
        options={mockData}
        labelKey="label"
        selectedValue={mockData[0]}
      />
    );

    expect(wrapper.state("frontInputValue")).toBe(mockData[0].label);
    expect(wrapper.state("backInputValue")).toBe(mockData[0].label);
    // triggers componentWillReceiveProps
    wrapper.setProps({ selectedValue: mockData[1] });
    expect(wrapper.state("frontInputValue")).toBe(mockData[1].label);
    expect(wrapper.state("backInputValue")).toBe(mockData[1].label);
  });

  it("Check placeholder prop", () => {
    expect(
      mount(<Typeahead options={[]} />)
        .find("input")
        .at(0)
        .prop("placeholder")
    ).toBe("Search..");
  });

  it("Pass custom placeholder", () => {
    expect(
      mount(<Typeahead options={[]} placeholder="Find.." />)
        .find("input")
        .at(0)
        .prop("placeholder")
    ).toBe("Find..");
  });

  // it('Check renderOptionItem prop', () => {
  //   const CustomRenderer = () => <div>Typeahead</div>
  //   const wrapper = shallow(<Typeahead options={mockData} labelKey="label" renderOptionItem={CustomRenderer} />)
  //   expect(wrapper.find(CustomRenderer)).toHaveLength(1)
  // })
});

describe("Test Input events", () => {
  it("Test keyDown Event", () => {
    const wrapper = mount(<Typeahead options={mockData} labelKey="label" />);
    wrapper
      .find("input")
      .at(0)
      .simulate("keyDown", { keyCode: 40 });
    expect(wrapper.state("isMenuOpened")).toBe(true);
  });

  it("Test onOpen prop through keyDown Event", () => {
    const fn = jest.fn();
    const wrapper = mount(
      <Typeahead options={mockData} labelKey="label" onOpen={fn} />
    );
    wrapper
      .find("input")
      .at(0)
      .simulate("keyDown", { keyCode: 40 });
    expect(wrapper.prop("onOpen")).toHaveBeenCalled();
  });

  it("Test onChange Event", () => {
    const wrapper = mount(<Typeahead options={mockData} labelKey="label" />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "al" } });
    expect(wrapper.state("frontInputValue")).toBe("al");
    expect(wrapper.state("backInputValue")).toBe("albania");
  });

  it("Test onDown Event", () => {
    const wrapper = mount(<Typeahead options={mockData} labelKey="label" />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "al" } })
      .simulate("keyDown", { keyCode: 40 });
    expect(wrapper.state("activeIndex")).toBe(0);
    expect(wrapper.find(".active")).toHaveLength(1);
  });
  it("Test onDown Event with empty test", () => {
    const wrapper = mount(<Typeahead options={mockData} labelKey="label" />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "" } });
    expect(wrapper.state("backInputValue")).toBe("");
    expect(wrapper.state("frontInputValue")).toBe("");
    expect(wrapper.state("activeIndex")).toBe(-1);
    expect(wrapper.find(".active")).toHaveLength(0);
  });
  it("Test onUp Event", () => {
    const wrapper = mount(<Typeahead options={mockData} labelKey="label" />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "al" } })
      .simulate("keyDown", { keyCode: 38 });
    expect(wrapper.state("activeIndex")).toBe(1);
    expect(wrapper.find(".active")).toHaveLength(1);
  });
  it("Test right key arrow Event", () => {
    const wrapper = mount(<Typeahead options={mockData} labelKey="label" />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "al" } })
      .simulate("keyDown", { keyCode: 39 });
    expect(wrapper.state("frontInputValue")).toBe("Albania");
    expect(wrapper.state("backInputValue")).toBe("");
  });
  it("Test Esc key Event", () => {
    const wrapper = mount(<Typeahead options={mockData} labelKey="label" />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "al" } })
      .simulate("keyDown", { keyCode: 27 });
    expect(wrapper.state("frontInputValue")).toBe("al");
    expect(wrapper.state("backInputValue")).toBe("");
  });
  it("Test Tab key Event", () => {
    const wrapper = mount(<Typeahead options={mockData} labelKey="label" />);
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "al" } })
      .simulate("keyDown", { keyCode: 9 });
    expect(wrapper.state("frontInputValue")).toBe("Albania");
    expect(wrapper.state("backInputValue")).toBe("");
  });
  it("Test onHide prop with Tab key Event", () => {
    const fn = jest.fn();
    const wrapper = mount(
      <Typeahead options={mockData} labelKey="label" onHide={fn} />
    );
    wrapper
      .find("input")
      .at(0)
      .simulate("change", { target: { value: "" } })
      .simulate("keyDown", { keyCode: 9 });

    expect(wrapper.state("backInputValue")).toBe("");
    expect(wrapper.state("isMenuOpened")).toBe(false);
    expect(wrapper.prop("onHide")).toHaveBeenCalled();
  });

  it("Test componentDidMount", () => {
    global.document.addEventListener = jest.fn();
    const wrapper = mount(<Typeahead options={mockData} labelKey="label" />);
    wrapper
      .find("input")
      .at(0)
      .simulate("keyDown", { keyCode: 38 });
    expect(wrapper.state("isMenuOpened")).toBe(true);
    expect(global.document.addEventListener).toHaveBeenCalled();
  });
  it("Test click anywhere else", () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const fn = jest.fn();

    const wrapper = mount(
      <div id="wrapper">
        <Typeahead options={mockData} labelKey="label" onHide={fn} />
      </div>
    );
    wrapper
      .find("input")
      .at(0)
      .simulate("keyDown", { keyCode: 38 });

    // mimick doc click event
    map.mousedown({
      target: wrapper.find("#wrapper").getDOMNode()
    });
    expect(fn).toBeCalled();
  });
});
