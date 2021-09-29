/** @format */

import React from "react";
import { isMobileCustom } from "../../util/customDeviceDetect";
import styled from "styled-components";
import { CustomIconButton } from "../module/CustomButtons/CustomButton";
import ScreamShare from "../modals/ScreamShare";
import Tabs from "../module/Tabs/Tabs";
import { ProjectTabData } from "../../data/ProjectTabData";

const FixedWrapper = styled.div`
  position: fixed;
  width: 95%;

  height: 90px;
  z-index: 99;
  background-color: white;
  top: 10px;
  left: 2.5%;
  border-radius: 20px 20px;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
`;

const FlexWrapper = styled.div`
  position: relative;
  width: 97.5%;
  height: 60px;
  z-index: 99;
  top: 0px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ImgWrapperDesktop = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 20px;
  left: calc(50% - 50px);
  margin-top: 10px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  overflow: hidden;
`;

const ImgWrapperMobile = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.8);
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

const ProjectHeader = ({
  imgUrl,
  title,
  loading,
  calendar,
  order,
  handleClose,
  handleClick,
  path,
  project,
}) => {
  return isMobileCustom ? (
    <FixedWrapper>
      <FlexWrapper>
        <CustomIconButton
          name="ArrowLeft"
          position="fixed"
          top="20px"
          shadow={false}
          handleButtonClick={handleClose}
        />

        <TitleWrapper>{title}</TitleWrapper>

        <ImgWrapperMobile>
          <img src={imgUrl} width="100%" alt="project-thumbnail" />
        </ImgWrapperMobile>
      </FlexWrapper>

      {/* <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <ScreamShare screamId={project} title={title} path={path} />
      </div> */}

      <Tabs
        loading={loading}
        handleClick={handleClick}
        order={order}
        tabLabels={
          calendar
            ? ProjectTabData.map((item) => item.text)
            : ProjectTabData.map((item) => item.text).slice(0, 2)
        }
        marginTop={"0px"}
        marginBottom={"0px"}
        lineColor={"#cecece"}
      ></Tabs>
    </FixedWrapper>
  ) : (
    <React.Fragment>
      <CustomIconButton
        name="ArrowLeft"
        position="fixed"
        marginLeft="10px"
        top="20px"
        handleButtonClick={handleClose}
      />

      <ImgWrapperDesktop>
        <img src={imgUrl} width="100%" alt="project-thumbnail" />
      </ImgWrapperDesktop>

      <TitleWrapper>{title}</TitleWrapper>

      <div style={{ position: "absolute", top: "20px", right: "10px" }}>
        <ScreamShare screamId={project} title={title} path={path} />
      </div>

      <Tabs
        loading={loading}
        handleClick={handleClick}
        order={order}
        tabLabels={
          calendar
            ? ProjectTabData.map((item) => item.text)
            : ProjectTabData.map((item) => item.text).slice(0, 2)
        }
        marginTop={"0px"}
        marginBottom={"0px"}
        lineColor={"white"}
      ></Tabs>
    </React.Fragment>
  );
};

export default ProjectHeader;
