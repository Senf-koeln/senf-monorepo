/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import ShareModal from "../../molecules/Modals/ShareModal";
import Tabs from "../../atoms/Tabs/Tabs";
import { ProjectTabData } from "../../../data/ProjectTabData";

const FixedWrapper = styled.div`
  z-index: 999;
  position: fixed;
  width: 95%;

  height: 80px;
  z-index: 99;
  background-color: white;
  top: 10px;
  left: 2.5%;
  border-radius: 20px 20px;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    left: 210px;
    width: 380px;
  }
`;

const FlexWrapper = styled.div`
  position: relative;
  width: 97.5%;
  height: 50px;
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
  const { openScream } = useSelector((state) => state.UI);
  const [shareOpen, setShareOpen] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Senf.koeln – ${title}`,
          url: path,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      setShareOpen(true);
    }
  };

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return (
    <React.Fragment>
      {shareOpen && (
        <ShareModal
          screamId={project}
          title={title}
          path={path}
          setShareOpen={setShareOpen}
        />
      )}

      <FixedWrapper openScream={openScream}>
        <FlexWrapper>
          <CustomIconButton
            name="ArrowLeft"
            position="fixed"
            top="9px"
            shadow={false}
            handleButtonClick={handleClose}
          />

          <TitleWrapper>{truncateString(title, 18)}</TitleWrapper>

          <ImgWrapperMobile>
            <img src={imgUrl} width="100%" alt="project-thumbnail" />
          </ImgWrapperMobile>
        </FlexWrapper>
        {/* <div style={{ position: "absolute", top: "20px", right: "10px" }}>
          <CustomIconButton
            name="Share"
            margin="0px"
            left="calc(100% - 50px)"
            position="relative"
            handleButtonClick={handleShare}
          />
        </div> */}

        {/* <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <ShareModal screamId={project} title={title} path={path} />
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
    </React.Fragment>
  );
};

export default ProjectHeader;
