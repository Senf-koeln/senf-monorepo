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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  position: relative;
  width: calc(95% - 20px);
  margin-left: 2.5%;
  margin-bottom: 10px;
  height: 130px;
  overflow: hidden;

  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(161, 117, 0, 0.1);
  border-radius: 18px;
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
  position: relative;
  width: 130px;
  height: 130px;
  flex: none;
  border-radius: 18px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

const OrganizationType = styled.h3`
  position: absolute;
  height: 16px;
  left: 154px;
  right: 10px;
  top: 6px;

  font-family: Futura PT W01 Book;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 114% */

  display: flex;
  align-items: center;

  color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  position: absolute;
  height: 22px;
  left: 154px;
  top: 28px;

  font-family: Futura PT W01-Bold;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height, or 122% */

  color: #483800;
`;

const Summary = styled.h3`
  position: absolute;
  height: 60px;
  left: 154px;
  right: 10px;
  top: 54px;

  font-family: Futura PT W01 Book;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: left;
  /* or 157% */

  color: #483800;
`;

export const OrganizationCard = (props) => {
  const {
    organization: { title, owner, imgUrl, organizationId },
  } = props;
  const dispatch = useDispatch();
  const pushEditOrganizationId = () => {
    localStorage.setItem("createOrganizationId", organizationId);
    dispatch(stateCreateOrganizationsFunc(true));
  };

  const pushOrganizationId = () => {
    dispatch(openOrganizationFunc(true, organizationId));
  };

  return (
    <Wrapper>
      <ExpandButton handleButtonClick={pushOrganizationId} />
      <CustomIconButton
        name="Menu"
        iconWidth="70%"
        handleButtonClick={() => pushEditOrganizationId()}
        position="absolute"
        left="calc(100% - 54px)"
        margin="2px"
        top="2px"
        backgroundColor="transparent"
        shadow={false}
      />
      <LogoWrapper>
        <StyledImg src={imgUrl} width="100%" alt="profile" />
      </LogoWrapper>
      <OrganizationType>Planungsbüro</OrganizationType>

      <Title>{title}</Title>
      <Summary>
        Kurzbeschreibung unserer tolllen Organisation. Was machen wir, wer sind
        wir etc...
      </Summary>
    </Wrapper>

    // <ProjectCardDesign>
    //   {/* <ExpandButton handleButtonClick={() => pushScreamId(project)} /> */}

    //   <RightWrapper>
    //     <Owner> {owner} </Owner>
    //     <Title>{title}</Title>
    //     {/*
    //     {endDate ? (
    //       <Date>
    //         {" "}
    //         {startDate} – {endDate}{" "}
    //       </Date>
    //     ) : (
    //       <Date>{startDate} </Date>
    //     )} */}
    //   </RightWrapper>
    // </ProjectCardDesign>
  );
};