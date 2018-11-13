import React from "react";
import Typeahead from "../../../src/";

export default () => (
  <Typeahead
    options={[
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
    ]}
    labelKey="label"
    renderItem={option => <div>Prefix: {option.label}</div>}
  />
);
