/** @format */

import React from "react";
import styled from "styled-components";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

const Tab = styled.div`
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

  z-index: 999;
  width: 160px;
  height: 35px;
  left: 20px;
  top: 80px;
  font-size: 14pt;
  line-height: 14pt;
  color: #353535;

  margin-bottom: 10px;
  border-radius: 17.5px;
`;
export function MenuItem({
  index,
  order,
  isSelectedIcon,
  isNotSelectedIcon,
  text,
  handleClick,
  openAccount,
}) {
  return (
    <Tab>
      <ExpandButton handleButtonClick={() => handleClick(index)} />
      <img
        src={
          order === index && !openAccount ? isSelectedIcon : isNotSelectedIcon
        }
        width="35"
        alt={text}
        style={{ paddingRight: "10px" }}
      />
      {text}
    </Tab>
  );
}
