/** @format */

import React, { useEffect, memo } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";

import {
  openAccountFunc,
  getMyScreams,
} from "../../../redux/actions/accountActions";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";
//Components
import RegistrationAndLogin from "../../organisms/Auth/LoginRegistration";
import InlineInformationPageDesktop from "../../organisms/infocomponents/InlineInformationPageDesktop";
import SelectLanguageButton from "../../atoms/Selects/SelectLanguageButton";
import TagsFilter from "../Filters/TagsFilter";
import { MenuItem } from "./MenuItem";
import { MenuData } from "../../../data/MenuData";

//ICONS
import LogoImg from "../../../images/logo.png";
import Insta from "../../../images/icons/socialmedia/insta.png";
import Facebook from "../../../images/icons/socialmedia/facebook.png";
import profile_yellow from "../../../images/icons/profile_yellow.png";
import profile_grey from "../../../images/icons/profile_grey.png";
import Circle_grey from "../../../images/icons/circle_grey.png";
import Circle_yellow from "../../../images/icons/circle_yellow.png";
import Noprofile from "../../../images/icons/noprofile.png";
//import PostScream from "../../organisms/PostIdea/PostScream";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { closeScream } from "../../../redux/actions/screamActions";
import { openProjectRoomFunc } from "../../../redux/actions/projectActions";
import { Logo, Tabs } from "./styles/sharedStyles";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";
import { SideBarTabs, StyledH2 } from "../../../styles/GlobalStyle";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";

const FilterWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: auto;
  max-height: ${(props) => (props.active ? "1000px" : "0px")};
  left: 20px;
  top: 70px;
`;
const SelectLanguageWrapper = styled.div`
  position: fixed;
  z-index: 99999;
  margin-left: 145px;
  bottom: 10px;
  z-index: 99999999;
`;

const DesktopSidebar = ({
  order,
  handleClick,
  setChangeLocationModalOpen,
  loading,
}) => {
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const projects = useSelector((state) => state.data.projects);
  const loadingProjects = useSelector((state) => state.data.loadingProjects);

  const user = useSelector((state) => state.user);
  const userId = user.userId;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openTheAccount = () => {
    dispatch(openProjectRoomFunc(null, false));
    dispatch(closeScream());
    dispatch(openAccountFunc(userId));
    window.history.pushState(null, null, "/");

    dispatch(handleTopicSelectorRedux("all"));
  };
  useEffect(() => {
    if (userId && openAccount) {
      if (userId) {
        dispatch(getMyScreams(userId));
      }
    }
  }, [openAccount, userId]);

  return (
    <div className={openInfoPage ? "sideBar_hide" : "sideBar"}>
      <Logo>
        <img src={LogoImg} width="100px" alt="logoWeb"></img>
      </Logo>
      <SelectLanguageWrapper>
        <SelectLanguageButton />
      </SelectLanguageWrapper>
      <br />{" "}
      {!user.authenticated ? (
        <SideBarTabs>
          <RegistrationAndLogin />
          <img
            src={Noprofile}
            width="35"
            alt="EndImage"
            style={{ paddingRight: "10px" }}
          />
          {t("login")}
        </SideBarTabs>
      ) : (
        <SideBarTabs fontWeight={openAccount ? "900" : undefined}>
          <ExpandButton
            handleButtonClick={openTheAccount}
            dataCy="profile-button"
          />

          {/* <StyledH2
            fontWeight="600"
            zIndex="9"
            style={{
              position: "absolute",
              marginLeft: "12px",
              marginTop: "2px",
              color: openAccount ? "#353535" : "#fed957",
            }}
          >
            {user?.handle?.slice(0, 1)}
          </StyledH2> */}

          <img
            src={openAccount ? profile_grey : profile_yellow}
            width="35"
            alt="EndImage"
            style={{ paddingRight: "10px" }}
          />
          {t("profile")}
        </SideBarTabs>
      )}
      <FilterWrapper active={openAccount}>
        <TagsFilter column loading={loading} type="topics" />
      </FilterWrapper>
      {/*  <PostScream loadingProjects={loadingProjects} projectsData={projects} /> */}
      <br />
      <MenuItem
        key={1}
        order={order}
        index={1}
        isSelectedIcon={MenuData[0].isSelectedIcon}
        isNotSelectedIcon={MenuData[0].isNotSelectedIcon}
        text={MenuData[0].text}
        handleClick={handleClick}
        openAccount={openAccount}
      />
      {/* <div
          style={{
            position: "relative",
            left: "20px",
            width: "160px",
            height: "1px",
            backgroundColor: "lightgrey",
            top: "90px",
            marginBottom: "30px",
          }}
        /> */}
      <FilterWrapper
        active={order === 1 && !loading && !openAccount && !openProjectRoom}
      >
        <TagsFilter column loading={loading} type="topics" />
      </FilterWrapper>
      <MenuItem
        key={2}
        order={order}
        index={2}
        isSelectedIcon={MenuData[1].isSelectedIcon}
        isNotSelectedIcon={MenuData[1].isNotSelectedIcon}
        text={MenuData[1].text}
        handleClick={handleClick}
        openAccount={openAccount}
      />
      <FilterWrapper
        active={order === 2 && !openProjectRoom && !openAccount && !loading}
      >
        <TagsFilter column type="organizationType" />
      </FilterWrapper>
      <FilterWrapper active={openProjectRoom}>
        <TagsFilter
          column
          loading={loading}
          type={openProjectRoom ? "topics" : "organizationType"}
        />
      </FilterWrapper>
      <div
        style={{
          position: "absolute",
          left: "20px",
          width: "160px",
          height: "1px",
          backgroundColor: "#cecece",
          marginTop: "85px",
        }}
      />
      <br />
      <InlineInformationPageDesktop />
      <div
        style={{
          position: "relative",
          left: "20px",
          width: "160px",
          height: "150px",
        }}
      />
      {import.meta.env.VITE_INTERNATIONAL &&
        import.meta.env.VITE_INTERNATIONAL === "true" && (
          <SubmitButton
            handleButtonClick={setChangeLocationModalOpen}
            shadow={false}
            text="Stadt ändern"
          ></SubmitButton>
        )}
      <a
        href="https://www.facebook.com/senf.koeln/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div
          className="facebook"
          style={openInfoPage ? { left: "-200px" } : null}
        >
          <img src={Facebook} width="25" alt="EndImage" />
        </div>
      </a>
      <a
        href="https://www.instagram.com/senf.koeln/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="insta" style={openInfoPage ? { left: "-200px" } : null}>
          <img src={Insta} width="25" alt="EndImage" />
        </div>{" "}
      </a>
    </div>
  );
};

export default memo(DesktopSidebar);
