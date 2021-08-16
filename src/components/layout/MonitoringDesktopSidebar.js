/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import Logo from "../../images/logo.png";

import SignNote from "../profile/SignNote";

//ICONS
import Insta from "../../images/icons/socialmedia/insta.png";
import Facebook from "../../images/icons/socialmedia/facebook.png";

import Insights_yellow from "../../images/icons/insights_yellow.png";
import Insights_grey from "../../images/icons/insights_grey.png";

import profile_yellow from "../../images/icons/profile_yellow.png";
import profile_grey from "../../images/icons/profile_grey.png";

import Noprofile from "../../images/noprofile.png";
import Arrow from "../../images/icons/arrow_yellow.png";

import Themenfilter from "./Themenfilter";
import Account from "../profile/Account";

export class MonitoringDesktopSidebar extends Component {
  state = {
    project: "",
  };

  render() {
    const {
      authenticated,

      order,
      handleClick,
      handleLegend,
      handleLegend1,
      handleLegend2,
      handleLegend3,
      handleLegend4,
      handleLegend5,
      handleLegend6,
      handleLegend7,
      checked,
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7,

      openInfoPageDesktop,

      deleteAccount,
      handleLogout,
    } = this.props;
    //

    const sign = !authenticated ? (
      <div className="profile">
        <SignNote />
        <img
          src={Noprofile}
          width="35"
          alt="EndImage"
          style={{ paddingRight: "10px" }}
        />
        Anmelden
      </div>
    ) : (
      <div
        className="profile"
        // onClick={() => handleClick(4)}
      >
        <Account
          handleLegend={this.handleLegend}
          handleLegend1={this.handleLegend1}
          handleLegend2={this.handleLegend2}
          handleLegend3={this.handleLegend3}
          handleLegend4={this.handleLegend4}
          handleLegend5={this.handleLegend5}
          handleLegend6={this.handleLegend6}
          handleLegend7={this.handleLegend7}
          checked={checked}
          checked1={checked1}
          checked2={checked2}
          checked3={checked3}
          checked4={checked4}
          checked5={checked5}
          checked6={checked6}
          checked7={checked7}
          deleteAccount={deleteAccount}
          handleLogout={handleLogout}
          openInfoPageDesktop={openInfoPageDesktop}
        />
        <img
          src={order === 4 ? profile_grey : profile_yellow}
          width="35"
          alt="EndImage"
          style={{ paddingRight: "10px" }}
        />
        Profil
      </div>
    );

    return (
      <div
        className={
          openInfoPageDesktop ? "FilterComponent_hide" : "FilterComponent"
        }
      >
        <h1 className="logoWeb">
          <img src={Logo} width="100px"></img>
        </h1>
        <div className="profile" onClick={() => handleClick(3)}>
          {/* <Insights /> */}
          <div style={{ width: "45px" }}>
            <img
              src={order === 3 ? Arrow : Arrow}
              width="25"
              alt="EndImage"
              style={{
                paddingRight: "10px",
                transform: "rotate(90deg) translateX(5px)",
              }}
            />
          </div>
          Zur Startseite
        </div>

        {sign}

        <div className="profile" onClick={() => handleClick(3)}>
          {/* <Insights /> */}
          <img
            src={order === 3 ? Insights_grey : Insights_yellow}
            width="35"
            alt="EndImage"
            style={{ paddingRight: "10px" }}
          />
          Insights
        </div>

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

        <Themenfilter
          handleLegend={handleLegend}
          handleLegend1={handleLegend1}
          handleLegend2={handleLegend2}
          handleLegend3={handleLegend3}
          handleLegend4={handleLegend4}
          handleLegend5={handleLegend5}
          handleLegend6={handleLegend6}
          handleLegend7={handleLegend7}
          checked={checked}
          checked1={checked1}
          checked2={checked2}
          checked3={checked3}
          checked4={checked4}
          checked5={checked5}
          checked6={checked6}
          checked7={checked7}
        ></Themenfilter>
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
            style={openInfoPageDesktop ? { left: "-200px" } : null}
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
            style={openInfoPageDesktop ? { left: "-200px" } : null}
          >
            <img src={Insta} width="25" alt="EndImage" />
          </div>{" "}
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(MonitoringDesktopSidebar);
