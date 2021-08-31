/** @format */

import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import topics from "../../data/topics";

export function Themenfilter({ handlers, checks }) {

  // Handler at index 0 is for the "all" checkbox
  const topicFilters = topics.map((topic, i) => {
    return (
      <Checkbox color="default"
        icon={<FiberManualRecordIcon />}
        checkedIcon={
          <FiberManualRecordIcon className="activelegenditem" />
        }
        onChange={() => handlers[i + 1](topic.name)}
        checked={checks[i + 1] === topic.name}
        style={{ color: topic.color }}
      />)
  });

  return (
    <div className="legendwrapper">
      {/* <div className="Filterheader"> Filter</div> */}
      <FormGroup row className="legend">
        <FormControlLabel
          control={
            <Checkbox
              icon={<FiberManualRecordIcon />}
              checkedIcon={
                <FiberManualRecordIcon className="activelegenditem" />
              }
              onChange={() => handlers[0](1)}
              checked={checks[0] === 1}
              style={{ color: "#000000" }}
            />
          }
          label="Alle Themen"
        />
        {topics.map((topic, i) =>
          <FormControlLabel key={`${topic.name}-${i}`}
            control={topicFilters[i]}
            label={topic.name}
          />)}

      </FormGroup>
    </div>
  );
}


export default Themenfilter;
