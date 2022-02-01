/** @format */

import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  openCreateProjectRoomFunc,
  openProjectRoomFunc,
} from "../../../redux/actions/projectActions";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

import styled from "styled-components";
import notPublishedIcon from "../../../images/icons/notPublished.png";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import {
  BodyText,
  Card,
  CardContent,
  CardTitle,
  ColorDot,
  DistrictHeader,
  Gradient,
} from "./styles/sharedStyles";
import { StyledH2, StyledText } from "../../../styles/GlobalStyle";
import organizationTypes from "../../../data/organizationTypes";

const ImgWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 18px;

  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const ImgWrapperOverlay = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 18px;
`;
const StyledImg = styled.img`
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TopFlexWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const RightWrapper = styled.div`
  padding-right: 20px;
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  flex-grow: 0;
  margin-right: 10px;
  margin-left: 3px;
`;

export const ProjectCard = (props) => {
  const {
    project: {
      projectRoomId,
      title,
      owner,
      imgUrl,
      description,
      status,
      organizationId,
      icon,
    },
  } = props;

  const cardOrganizationId = organizationId;
  const user = useSelector((state) => state.user);
  const organizations = useSelector((state) => state.data.organizations);
  const dispatch = useDispatch();

  const pushScreamId = () => {
    dispatch(openProjectRoomFunc(projectRoomId, true));
  };
  const handleEdit = () => {
    localStorage.setItem("createProjectRoomOrganizationId", organizationId);
    localStorage.setItem("createProjectRoomId", projectRoomId);
    localStorage.setItem("createProjectPostEdit", true);

    dispatch(openCreateProjectRoomFunc(true));
  };

  const organizationCardData = [];

  if (organizations) {
    organizations.forEach(({ organizationId, userIds }) => {
      if (cardOrganizationId === organizationId) {
        organizationCardData.push(userIds);
      }
    });
  }

  return (
    <Card project={true}>
      <CardContent>
        {organizationCardData[0]?.includes(user.userId) && (
          <CustomIconButton
            name="Menu"
            iconWidth="70%"
            handleButtonClick={() => handleEdit()}
            position="absolute"
            left="calc(100% - 54px)"
            margin="2px"
            bottom="0px"
            backgroundColor="transparent"
            shadow={false}
            zIndex="99"
          />
        )}
        <ExpandButton handleButtonClick={() => pushScreamId()} />
        <FlexWrapper>
          <RightWrapper>
            <TopFlexWrapper>
              <Icon>{icon}</Icon>

              <h4>{owner}</h4>
            </TopFlexWrapper>

            <CardTitle>
              <StyledH2 fontWeight="900">{title}</StyledH2>
            </CardTitle>
          </RightWrapper>
          <ImgWrapper>
            {status === "archived" && (
              <ImgWrapperOverlay>
                <img src={notPublishedIcon} alt="UploadImageIcon" width="50%" />
              </ImgWrapperOverlay>
            )}

            <StyledImg src={imgUrl} width="100%" alt="profile" />
          </ImgWrapper>
        </FlexWrapper>
        <BodyText>
          <StyledText>{description} </StyledText>
        </BodyText>
        <Gradient />
      </CardContent>
    </Card>
  );
};
