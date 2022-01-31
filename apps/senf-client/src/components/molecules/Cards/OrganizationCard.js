/** @format */

import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import AddIcon from "../../../images/icons/plus_grey.png";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import {
  openOrganizationFunc,
  stateCreateOrganizationsFunc,
} from "../../../redux/actions/organizationActions";
import { StyledH2, StyledImg, StyledText } from "../../../styles/GlobalStyle";
import organizationTypes from "../../../data/organizationTypes";

const Wrapper = styled.div`
  width: 100%;
  height: 0;
  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation};
  overflow: hidden;
  border-radius: 25px;
  background-color: white;
  margin: 0;
  padding: 0;
  padding-bottom: calc(100% + 60px);

  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-bottom: 10px;
  height: 130px;
  overflow: hidden;

  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(161, 117, 0, 0.1);
  border-radius: 18px; */
  animation: OrganizationCardAnimation 0.8s;

  @keyframes OrganizationCardAnimation {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 60px);
  margin: 10px;
  flex: none;
  border-radius: 18px;
  overflow: hidden;
`;

const OrganizationType = styled.h4`
  position: absolute;
  height: 16px;
  left: 154px;
  right: 10px;
  top: 6px;

  /* identical to box height, or 114% */

  display: flex;
  align-items: center;

  color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  position: absolute;
  height: 22px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 15px;
`;

export const OrganizationCard = (props) => {
  const {
    organization: {
      title,
      owner,
      imgUrl,
      organizationId,
      userIds,
      organizationType,
    },
  } = props;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleEdit = () => {
    localStorage.setItem("createOrganizationId", organizationId);
    localStorage.setItem("createOrganizationPostEdit", true);

    dispatch(stateCreateOrganizationsFunc(true));
  };

  const handleOpenOrganization = () => {
    dispatch(openOrganizationFunc(true, organizationId));
  };

  return (
    <Wrapper>
      <ExpandButton handleButtonClick={handleOpenOrganization} />
      {userIds.includes(user.userId) && (
        <CustomIconButton
          name="Menu"
          iconWidth="70%"
          handleButtonClick={() => handleEdit()}
          position="absolute"
          left="calc(100% - 54px)"
          margin="2px"
          top="0px"
          backgroundColor="transparent"
          shadow={false}
          zIndex="99"
        />
      )}
      <LogoWrapper>
        <StyledImg src={imgUrl} width="100%" alt="profile" />
      </LogoWrapper>
      {/* <OrganizationType>{organizationType}</OrganizationType> */}

      <Title>
        <StyledH2 fontWeight="900">{title}</StyledH2>
      </Title>
      {/* <Summary>
        <StyledText>
          Kurzbeschreibung unserer tolllen Organisation und was wir machen.
        </StyledText>
      </Summary> */}
    </Wrapper>
  );
};
