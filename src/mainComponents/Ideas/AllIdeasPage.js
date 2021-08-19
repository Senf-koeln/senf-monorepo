import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import lamploader from "../../images/lamp.png";
import Arrow from "../../images/icons/sort.png";

import { Themenfilter } from "../../components/layout/Themenfilter";
import ToggleDisplay from "react-toggle-display";
import {
  MuiThemeProvider,
  NativeSelect,
  createMuiTheme,
} from "@material-ui/core";
import Geofilter from "../../components/map/Geofilter";
import Scream from "../../components/scream/Scream";

import _ from "lodash";

const styles = {};

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0)",
        },
        "&&&&:after": {
          borderBottom: "1px solid rgba(255, 255, 255, 0)",
        },
      },
    },
    MuiNativeSelect: {
      icon: {
        opacity: 0,
      },
    },
  },
});
export class AllIdeasPage extends Component {
  render() {
    const {
      classes,
      loading,
      order,
      dropdown,
      _onViewportChange,
      handleRevert,
      openGeofilter,
      handleOpenGeofilter,
      handleCloseGeofilter,
      handleResetGeofilter,
      showGeofilterResults,
      createGeofilterCircle,
      latitude1,
      longitude1,
      latitude2,
      longitude2,
      latitude3,
      longitude3,
      latitude4,
      longitude4,
      handleDropdown,
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
      dataNoLocationHandle,
      selectedId,
      noLocation,
      viewport,
      dataFinal,
      projectsData,
    } = this.props;

    let HotScreamsMarkup = _.orderBy(dataFinal, "likeCount", "desc").map(
      (scream) => (
        <Scream
          loading={loading}
          key={scream.screamId}
          scream={scream}
          projectsData={projectsData}
        />
      )
    );

    let recentScreamsMarkup = _.orderBy(dataFinal, "createdAt", "desc").map(
      (scream) => (
        <Scream
          loading={loading}
          key={scream.screamId}
          scream={scream}
          projectsData={projectsData}
        />
      )
    );

    let screamLength = dataFinal.length;

    let noMoreScreamsMarkup =
      !loading && screamLength > 0 ? (
        <div className="ende">
          ... <br /> Keine weiteren Ideen <br />
        </div>
      ) : (
        <div className="no-ideas-yet">
           Mit den ausgewählten Filtern findest du noch keine Ideen.
        </div>
      );

    const content = !loading && (
      <>
        <ToggleDisplay show={dropdown === "10"}>
          <div className={dropdown === "10" ? "MainAnimation" : ""}>
            {recentScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
        <ToggleDisplay show={dropdown === "20"}>
          <div className={dropdown === "20" ? "MainAnimation" : ""}>
            {HotScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
      </>
    );

    return order === 1 ? (
      <div className="MainAnimationChannels">
        <div>
          <div className="content">
            <div className="homeHeadermain">
              <div className="FilterComponentMobile">
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
                ></Themenfilter>{" "}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <div className="idea-header">
                  <ToggleDisplay show={dropdown === "10" || dropdown === "20"}>
                    <img
                      src={lamploader}
                      width="50px"
                      style={{
                        transform: "translateY(10px) rotate(30deg)",
                      }}
                      alt="lamploader"
                    ></img>
                    {screamLength} Ideen{" "}
                  </ToggleDisplay>

                  {/* <ToggleDisplay show={dropdown === "30"}>
                      {StatusFullfilledScreamsMarkup.length} Ideen{" "}
                    </ToggleDisplay>
                    <ToggleDisplay show={dropdown === "40"}>
                      {StatusDeleteScreamsMarkup.length} Ideen{" "}
                    </ToggleDisplay> */}
                </div>

                <MuiThemeProvider theme={theme}>
                  <NativeSelect
                    value={dropdown}
                    onChange={handleDropdown}
                    name="dropdown"
                    className="formControl"
                    inputProps={{ "aria-label": "dropdown" }}
                    id="dropdown"
                    IconComponent={() => (
                      <img
                        src={Arrow}
                        width="20px"
                        style={{
                          marginTop: "0px",
                          marginLeft: "-24px",
                          pointerEvents: "none",
                        }}
                      ></img>
                    )}
                  >
                    <option value={10} className={classes.formText}>
                      neuste
                    </option>
                    <option value={20}>schärfste</option>
                    {/* <option value={30}>umgesetzte</option>
                  <option value={40}>verworfene</option> */}
                  </NativeSelect>
                </MuiThemeProvider>
              </div>
            </div>

            <Geofilter
              dataFinal={dataFinal}
              latitude1={latitude1}
              latitude2={latitude2}
              latitude3={latitude3}
              latitude4={latitude4}
              longitude1={longitude1}
              longitude2={longitude2}
              longitude3={longitude3}
              longitude4={longitude4}
              viewport={viewport}
              _onViewportChange={_onViewportChange}
              handleRevert={handleRevert}
              noLocation={noLocation}
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
              handleOpenGeofilter={handleOpenGeofilter}
              handleCloseGeofilter={handleCloseGeofilter}
              handleResetGeofilter={handleResetGeofilter}
              openGeofilter={openGeofilter}
              showGeofilterResults={showGeofilterResults}
              createGeofilterCircle={createGeofilterCircle}
              dataNoLocationHandle={dataNoLocationHandle}
              selectedId={selectedId}
              noLocation={noLocation}
            />

            {content}

            {/* <ToggleDisplay show={dropdown === "30"}>
                <div className={dropdown === "30" ? "MainAnimation" : ""}>
                  {StatusFullfilledScreamsMarkup}
                  {noMoreStatusFullfilledScreamsMarkup}
                </div>
              </ToggleDisplay>
              <ToggleDisplay show={dropdown === "40"}>
                <div className={dropdown === "40" ? "MainAnimation" : ""}>
                  {StatusDeleteScreamsMarkup}
                  {noMoreStatusDeleteScreamsMarkup}
                </div>
              </ToggleDisplay> */}
          </div>
        </div>
      </div>
    ) : null;
  }
}
AllIdeasPage.propTypes = {};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(AllIdeasPage));
