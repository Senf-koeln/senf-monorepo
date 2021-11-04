/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import { closeAccountFunc } from "../../../redux/actions/accountActions";

//Components
import IdeaList from "../IdeaList/IdeaList";
import AccountHeader from "../../molecules/Headers/AccountHeader";
import AccountSettings from "./AccountSettings";
import MainAnimations from "../../atoms/Animations/MainAnimations";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../../atoms/Backgrounds/GradientBackgrounds";
import Loader from "../../atoms/Animations/Loader";

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const Account = ({ handleTopicSelector, topicsSelected, dataFinalMap }) => {
  const loadingMyScreams = useSelector((state) => state.data.loadingMyScreams);
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const myScreams = useSelector((state) => state.data.myScreams);
  const [dropdown, setDropdown] = useState("newest");
  const [order, setOrder] = useState(1);
  const dispatch = useDispatch();

  const handleClose = () => {
    window.history.pushState(null, null, `/`);
    dispatch(closeAccountFunc());
  };

  const handleClick = (order) => {
    setOrder(order);
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const sortedScreams =
    dropdown === "newest"
      ? _.orderBy(myScreams, "createdAt", "desc")
      : _.orderBy(myScreams, "likeCount", "desc");

  const dataFinal = myScreams
    ? sortedScreams.filter(
        ({ Thema, status, lat, long }) =>
          topicsSelected.includes(Thema) &&
          lat <= mapBounds.latitude1 &&
          lat >= mapBounds.latitude2 &&
          long >= mapBounds.longitude2 &&
          long <= mapBounds.longitude3 &&
          status === "None"
      )
    : [];

  const dataFinalLength = dataFinal.length;

  return (
    <React.Fragment>
      <AccountHeader
        loading={loadingMyScreams}
        order={order}
        handleClose={handleClose}
        handleClick={handleClick}
      />

      <div className="accountDialog">
        {isMobileCustom ? <BackgroundMobile /> : <BackgroundDesktop />}

        {loadingMyScreams ? (
          <Loader />
        ) : order === 1 ? (
          <IdeaList
            type="myIdeas"
            loading={loadingMyScreams}
            order={order}
            dataFinal={dataFinal}
            dataFinalLength={dataFinalLength}
            viewport={mapViewport}
            handleDropdown={handleDropdown}
            dropdown={dropdown}
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
            dataFinalMap={dataFinalMap}
          ></IdeaList>
        ) : null}

        {order === 2 && (
          <React.Fragment>
            <Break />
            <MainAnimations
              transition="0.5s"
              display="block"
              paddingBottom="2em"
              height="100%"
            >
              <AccountSettings />
            </MainAnimations>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Account;
