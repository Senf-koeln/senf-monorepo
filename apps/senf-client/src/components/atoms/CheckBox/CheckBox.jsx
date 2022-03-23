/** @format */

import React from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  z-index: 99;
`;
//
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: ${(props) => (props.checked ? "#353535" : "#e9eef5")};
  border-radius: 3px;
  transition: all 150ms;
  border: 2px solid #353535;
  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const CheckBox = ({ name, selected, handleInputChange }) => {
  return (
    <span className="check-box">
      <CheckboxContainer onClick={handleInputChange}>
        <HiddenCheckbox
          name={name}
          type="checkbox"
          checked={selected}
          // onChange={() => alert("hi")}
        />
        <StyledCheckbox checked={selected}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
    </span>
  );
};

export default CheckBox;
