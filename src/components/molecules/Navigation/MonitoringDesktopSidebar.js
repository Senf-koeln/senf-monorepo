/** @format */

import React, { Component } from "react";
import LogoImg from "../../../images/logo.png";
import { Logo, Tabs } from "./styles/sharedStyles";

import LoginRegistration from "../../organisms/Auth/LoginRegistration";

//ICONS
import Insta from "../../../images/icons/socialmedia/insta.png";
import Facebook from "../../../images/icons/socialmedia/facebook.png";

import Insights_yellow from "../../../images/icons/insights_yellow.png";
import Insights_grey from "../../../images/icons/insights_grey.png";

import Noprofile from "../../../images/noprofile.png";
import Arrow from "../../../images/icons/arrow_yellow.png";

import TopicFilter from "../../atoms/Filters/TopicFilter";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

export class MonitoringDesktopSidebar extends Component {
  render() {
    const { handleTopicSelector, topicsSelected } = this.props;
    //

    return (
      <div className="sideBar">
        <Logo>
          <img src={LogoImg} width="100px" alt="logoWeb"></img>
        </Logo>
        <Tabs>
          <ExpandButton
            handleButtonClick={() => window.open("/")}
            dataCy="profile-button"
          />
          <img
            src={Arrow}
            width="25"
            alt="EndImage"
            style={{
              paddingRight: "10px",
              transform: "rotate(90deg) translateX(5px)",
            }}
          />
          Zur Startseite
          {/* {t("profile")} */}
        </Tabs>

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
          <div className="facebook">
            <img src={Facebook} width="25" alt="EndImage" />
          </div>
        </a>
        <a
          href="https://www.instagram.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="insta">
            <img src={Insta} width="25" alt="EndImage" />
          </div>{" "}
        </a>
      </div>
    );
  }
}

export default MonitoringDesktopSidebar;
