/** @format */

import React from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";

//Components
import SignNote from "../profile/SignNote";
import InlineInformationPageDesktop from "../infocomponents/InlineInformationPageDesktop";
import TopicFilter from "./TopicFilter";
import Account from "../profile/Account";
import { MenuItem } from "./MenuItem";
import { MenuData } from "../../data/MenuData";

//ICONS
import Logo from "../../images/logo.png";
import Insta from "../../images/icons/socialmedia/insta.png";
import Facebook from "../../images/icons/socialmedia/facebook.png";
import profile_yellow from "../../images/icons/profile_yellow.png";
import profile_grey from "../../images/icons/profile_grey.png";
import Noprofile from "../../images/noprofile.png";
import PostScream from "../postScream/PostScream";
import { isMobileCustom } from "../../util/customDeviceDetect";

const DesktopSidebar = ({
  loading,
  classes,
  order,
  handleClick,
  handleTopicSelector,
  topicsSelected,
  handleCookies,
  deleteAccount,
  handleLogout,
  loadingProjects,
  projectsData,
}) => {
  const { openInfoPage } = useSelector((state) => state.UI);
  const { authenticated } = useSelector((state) => state.user);

  const { t } = useTranslation();

  return (

    !isMobileCustom && (
      <div className={openInfoPage ? "sideBar_hide" : "sideBar"}>
        <h1 className="logoWeb">
          <img src={Logo} width="100px"></img>
        </h1>
        <InlineInformationPageDesktop
          handleCookies={handleCookies}
          loading={loading}
          classes={classes}
        />

        {!authenticated ? (
          <div className="profile">
            <SignNote />
            <img
              src={Noprofile}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("login")}
          </div>
        ) : (
          <div className="profile">
            <Account
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
              deleteAccount={deleteAccount}
              handleLogout={handleLogout}
            />
            <img
              src={order === 4 ? profile_grey : profile_yellow}
              width="35"
              alt="EndImage"
              style={{ paddingRight: "10px" }}
            />
            {t("profile")}
          </div>
        )}
        <PostScream
          loadingProjects={loadingProjects}
          projectsData={projectsData}
        />

        {MenuData.map((item, i) => (
          <MenuItem
            order={order}
            index={i + 1}
            isSelectedIcon={item.isSelectedIcon}
            isNotSelectedIcon={item.isNotSelectedIcon}
            text={item.text}
            name={item.name}
            handleClick={handleClick}
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
