/** @format */

import React from "react";

import lightbulbImg from "../../../images/lamp.png";
import SortingSelect from "../../atoms/Selects/SortingSelect";
import styled, { keyframes } from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  font-family: PlayfairDisplay-Regular;
  font-size: 24px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 10px 2.5% 20px 2.5%;

  animation: ToolbarAnimation 0.7s;
  pointer-events: none;

  @media (min-width: 768px) {
    position: fixed;
    top: ${(props) => (props.type === "allIdeas" ? "40px" : "100px")};
    z-index: 99;
    width: 380px;
    padding: 10px 10px 20px 10px;
  }

  @keyframes ToolbarAnimation {
    0% {
      opacity: 0;
      transform: translateY(10%);
    }
    20% {
      opacity: 0;
      transform: translateY(10%);
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const Bar = styled.div`
  position: absolute;
  width: 60px;
  height: 4px;
  border-radius: 10px;
  margin-left: calc(47.5% - 30px);
  background-color: white;
  top: 10px;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  z-index: -1;
  pointer-events: auto;
`;
const IdeaHeader = styled.div`
  z-index: 2;
  margin-top: -20px;
  font-size: 26px;

  @media screen and (max-width: 330px) {
    margin-top: -20px;
    font-size: 21pt;
    margin-left: -5px;
  }
`;
const Lightbulb = styled.img`
  width: 50px;
  transform: translateY(10px) rotate(30deg);
`;

const Toolbar = ({
  loading,
  type,
  handleDropdown,
  marginTop,
  handleClickSwipe,
  dataFinalLength,
}) => {
  const { t } = useTranslation();

  return (
    !loading && (
      <Wrapper type={type}>
        {isMobileCustom && <Bar />}
        <IdeaHeader>
          <Lightbulb src={lightbulbImg} alt={"lightbulb"} />
          {dataFinalLength} {dataFinalLength === 1 ? t("idea") : t("ideas")}
        </IdeaHeader>
        <SortingSelect handleDropdown={handleDropdown} />{" "}
        {isMobileCustom && <Background onClick={handleClickSwipe} />}
      </Wrapper>
    )
  );
};

export default Toolbar;
