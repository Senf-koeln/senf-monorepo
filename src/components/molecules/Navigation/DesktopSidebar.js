/** @format */

import React from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { openAccountFunc } from "../../../redux/actions/accountActions";

//Components
import RegistrationAndLogin from "../../atoms/Auth/LoginRegistration";
import InlineInformationPageDesktop from "../../organisms/infocomponents/InlineInformationPageDesktop";
import TopicFilter from "../../atoms/Filters/TopicFilter";
import { MenuItem } from "./MenuItem";
import { MenuData } from "../../../data/MenuData";

//ICONS
import LogoImg from "../../../images/logo.png";
import Insta from "../../../images/icons/socialmedia/insta.png";
import Facebook from "../../../images/icons/socialmedia/facebook.png";
import profile_yellow from "../../../images/icons/profile_yellow.png";
import profile_grey from "../../../images/icons/profile_grey.png";
import Noprofile from "../../../images/noprofile.png";
import PostScream from "../../organisms/PostIdea/PostScream";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import styled from "styled-components";
import { closeScream } from "../../../redux/actions/screamActions";
import { closeProject } from "../../../redux/actions/projectActions";

const Logo = styled.div`
  position: fixed;
  width: 180px;
  z-index: 99999;

  padding-bottom: 10;
  font-size: 40;
  margin-left: 20px;
  padding-top: 35px;
  margin-top: 0;
  /* animation: logoAnimation 2.5s; */
  background-color: #f8f8f8;
`;

const Tabs = styled.div`
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;

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

const DesktopSidebar = ({
  loading,
  classes,
  order,
  handleClick,
  handleTopicSelector,
  topicsSelected,
  loadingProjects,
  projectsData,
}) => {
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openAccount = useSelector((state) => state.UI.openAccount);

  const authenticated = useSelector((state) => state.user.authenticated);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openTheAccount = () => {
    dispatch(openAccountFunc(userId));

    dispatch(closeScream());
    dispatch(closeProject());

    handleTopicSelector("all");
  };

  return (
    !isMobileCustom && (
      <div className={openInfoPage ? "sideBar_hide" : "sideBar"}>
        <Logo>
          <img src={LogoImg} width="100px" alt="logoWeb"></img>
        </Logo>
        <InlineInformationPageDesktop loading={loading} classes={classes} />

        {!authenticated ? (
          <Tabs>
            <RegistrationAndLogin />
            <img
              src={Noprofile}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("login")}
          </Tabs>
        ) : (
          <Tabs>
            <ExpandButton
              handleButtonClick={openTheAccount}
              dataCy="profile-button"
            />
            <img
              src={openAccount ? profile_grey : profile_yellow}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("profile")}
          </Tabs>
        )}
        <PostScream
          loadingProjects={loadingProjects}
          projectsData={projectsData}
        />

        {MenuData.map((item, i) => (
          <MenuItem
            key={i}
            order={order}
            index={i + 1}
            isSelectedIcon={item.isSelectedIcon}
            isNotSelectedIcon={item.isNotSelectedIcon}
            text={item.text}
            handleClick={handleClick}
            openAccount={openAccount}
          ></MenuItem>
        ))}

        <div
          style={{
            position: "relative",
            left: "20px",
            width: "160px",
            height: "1px",
            backgroundColor: "lightgrey",
            top: "90px",
            marginBottom: "30px",
          }}
        ></div>

        <TopicFilter
          handleTopicSelector={handleTopicSelector}
          topicsSelected={topicsSelected}
        ></TopicFilter>

        <div
          style={{
            position: "relative",
            left: "20px",
            width: "160px",
            height: "100px",
          }}
        ></div>

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
          <div
            className="insta"
            style={openInfoPage ? { left: "-200px" } : null}
          >
            <img src={Insta} width="25" alt="EndImage" />
          </div>{" "}
        </a>
      </div>
    )
  );
};

export default DesktopSidebar;
