/** @format */

import React from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import Tabs from "../../atoms/Tabs/Tabs";
import { AccountTabData } from "../../../data/AccountTabData";
import { useSelector } from "react-redux";

const FixedWrapper = styled.div`
  z-index: 91;
  position: fixed;
  width: 95%;

  height: 80px;
  background-color: white;
  top: ${(props) => (props.moveUp ? "-90px" : "10px")};
  left: 2.5%;
  border-radius: 20px 20px;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
  animation: downAnimation 1.7s ease-in-out;

  @media (min-width: 768px) {
    left: 210px;
    width: 380px;
    animation: none;
  }

  @keyframes downAnimation {
    0% {
      transform: translateY(-100%);
    }
    50% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

const FlexWrapper = styled.div`
  position: relative;
  width: 97.5%;
  height: 50px;
  top: 0px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  font-size: 18px;
  font-family: PlayfairDisplay-Bold;
  color: #353535;
  text-align: center;
  width: 60%;
  margin-left: 20%;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const ProjectHeader = ({ loading, order, handleClose, handleClick }) => {
  const handle = useSelector((state) => state.user.handle);
  const openScream = useSelector((state) => state.UI.openScream);
  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return (
    <FixedWrapper moveUp={openScream}>
      <FlexWrapper>
        <CustomIconButton
          name="ArrowLeft"
          position="fixed"
          top="10px"
          shadow={false}
          handleButtonClick={handleClose}
        />

        <TitleWrapper data-cy="hey-user">
          {truncateString("Hey " + handle, 18)}
        </TitleWrapper>
        <div />
      </FlexWrapper>

      <Tabs
        loading={loading}
        handleClick={handleClick}
        order={order}
        tabLabels={AccountTabData.map((item) => item.text)}
        marginTop={"0px"}
        marginBottom={"0px"}
        lineColor={"#cecece"}
      ></Tabs>
    </FixedWrapper>
  );
};

export default ProjectHeader;
