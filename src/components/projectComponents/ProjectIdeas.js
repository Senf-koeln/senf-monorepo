/** @format */

import React from "react";
import ToggleDisplay from "react-toggle-display";
import _ from "lodash";
import { isMobileCustom } from "../../util/customDeviceDetect";
import styled, { css, keyframes } from "styled-components";

//Components
import Geofilter from "../map/Geofilter";
import Scream from "../scream/Scream";
import TopicFilter from "../layout/TopicFilter";
import SortingSelect from "../module/Selects/SortingSelect";

//Images
import ListHeader from "../module/Headers/ListHeader";

const MobileFilterAndMapWrapper = styled.div`
  margin-top: 0px;
  margin-left: 2.5%;
  width: 95%;
  z-index: 9;
`;

const ProjectIdeas = ({
  loading,
  dropdown,
  projectScreams,

  viewport,
  latitude1,
  longitude1,
  latitude2,
  longitude2,
  latitude3,
  longitude3,
  latitude4,
  longitude4,
  handleRevert,
  _onViewportChange,
  onClick,

  handleDropdown,

  handleTopicSelector,
  topicsSelected,

  handleOpenGeofilter,
  handleCloseGeofilter,
  handleResetGeofilter,
  openGeofilter,
  showGeofilterResults,
  createGeofilterCircle,
  dataNoLocationHandle,
  selectedId,
  handleNoLocation,

  loadingProjects,
  geoData,
}) => {
  const dataFinalChannel = projectScreams.filter(
    ({ Thema, lat, long, status }) =>
      topicsSelected.includes(Thema) &&
      lat <= latitude1 &&
      lat >= latitude2 &&
      long >= longitude2 &&
      long <= longitude3 &&
      status === "None"
  );

  let recentScreamsMarkup = _.orderBy(
    dataFinalChannel,
    "createdAt",
    "desc"
  ).map((scream) => <Scream key={scream.screamId} scream={scream} />);

  let HotScreamsMarkup = _.orderBy(dataFinalChannel, "likeCount", "desc").map(
    (scream) => <Scream key={scream.screamId} scream={scream} />
  );

  let noMoreScreamsMarkup =
    !loading && dataFinalChannel.length > 0 ? (
      <div className="ende">
        ... <br /> Keine weiteren Ideen <br />
      </div>
    ) : !loading && dataFinalChannel.length !== projectScreams.length ? (
      <div className="no-ideas-yet">
          Mit den ausgewählten Filtern findest du noch keine Ideen.
      </div>
    ) : (
      <div className="no-ideas-yet">
         Zu diesem Projektraum wurde bisher noch keine Idee geteilt. Sei die/der
        erste und teile deine Idee!
      </div>
    );

  return !loading ? (
    <div className="projectIdeascontent">
      {isMobileCustom && (
        <MobileFilterAndMapWrapper>
          <TopicFilter
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
          ></TopicFilter>

          <Geofilter
            dataFinal={dataFinalChannel}
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
            onClick={onClick}
            handleRevert={handleRevert}
            handleNoLocation={handleNoLocation}
            handleOpenGeofilter={handleOpenGeofilter}
            handleCloseGeofilter={handleCloseGeofilter}
            handleResetGeofilter={handleResetGeofilter}
            openGeofilter={openGeofilter}
            showGeofilterResults={showGeofilterResults}
            createGeofilterCircle={createGeofilterCircle}
            dataNoLocationHandle={dataNoLocationHandle}
            selectedId={selectedId}
            loadingProjects={loadingProjects}
            geoData={geoData}
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
          />
        </MobileFilterAndMapWrapper>
      )}

      {!loading && (
        <ListHeader
          handleDropdown={handleDropdown}
          dataFinal={dataFinalChannel}
          marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
        />
      )}

      <ToggleDisplay show={dropdown === "newest"}>
        <div className={dropdown === "newest" ? "MainAnimation" : ""}>
          {recentScreamsMarkup}
          {noMoreScreamsMarkup}
        </div>
      </ToggleDisplay>
      <ToggleDisplay show={dropdown === "hottest"}>
        <div className={dropdown === "hottest" ? "MainAnimation" : ""}>
          {HotScreamsMarkup}
          {noMoreScreamsMarkup}
        </div>
      </ToggleDisplay>
    </div>
  ) : null;
};

export default ProjectIdeas;