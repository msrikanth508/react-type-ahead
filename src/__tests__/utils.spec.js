import * as utils from "../utils/";

const fakeObjectTypeOptions = [
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
const fakeStringOptions = fakeObjectTypeOptions.map(item => item.label);
const labelKey = "label";

describe("getOptionLabel func", () => {
  it("getOptionLabel with object type", () => {
    expect(utils.getOptionLabel(fakeObjectTypeOptions[0], labelKey)).toBe(
      "Afghanistan"
    );
  });
  it("getOptionLabel with string type", () => {
    expect(utils.getOptionLabel(fakeStringOptions[0], labelKey)).toBe(
      "Afghanistan"
    );
  });
});

describe("getOptionByLabel func", () => {
  it("getOptionByLabel with object type", () => {
    expect(
      utils.getOptionByLabel(fakeObjectTypeOptions, "Afghanistan", labelKey)
    ).toMatchObject(fakeObjectTypeOptions[0]);
  });
  it("getOptionByLabel with string type", () => {
    expect(
      utils.getOptionByLabel(fakeStringOptions, "afghanistan", labelKey)
    ).toBe("Afghanistan");
  });
});

describe("caseInsensitiveEquals func", () => {
  test("caseInsensitiveEquals without error", () => {
    expect(utils.caseInsensitiveEquals("Al", "al")).toBe(true);
  });
  test("caseInsensitiveEquals with error", () => {
    expect(utils.caseInsensitiveEquals("123", 123)).toBe(false);
  });
});

describe("findItem func", () => {
  it("find item using search text", () => {
    expect(utils.findItem(fakeObjectTypeOptions, "al", labelKey)).toBe(
      "albania"
    );
  });
  it("no match", () => {
    expect(utils.findItem(fakeObjectTypeOptions, "seria", labelKey)).toBe("");
  });
  it("try to find item with wrong type", () => {
    expect(utils.findItem(fakeObjectTypeOptions, 123, labelKey)).toBe("");
  });
});

describe("filterOptions func", () => {
  it("find item using search text", () => {
    expect(
      fakeObjectTypeOptions.filter(option =>
        utils.filterOptions(option, "al", labelKey)
      )
    ).toHaveLength(2);
  });
  it("No match found", () => {
    expect(
      fakeObjectTypeOptions.filter(option =>
        utils.filterOptions(option, "123", labelKey)
      )
    ).toHaveLength(0);
  });
});
