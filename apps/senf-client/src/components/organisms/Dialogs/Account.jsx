/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import { closeAccountFunc } from "../../../redux/actions/accountActions";

//Components
import SwipeList from "../SwipeLists/SwipeList";
import Header from "../../molecules/Headers/Header";
import InfoModal from "../../molecules/DialogInlineComponents/InfoModal";

import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import { AccountTabData } from "../../../data/AccountTabData";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { useTranslation } from "react-i18next";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const Wrapper = styled.div`
  /* @media (min-width: 768px) {
    padding-top: 70px;
  } */
`;
const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const MapHider = styled.div`
  width: calc(100% - 600px);
  height: 100%;
  position: fixed;
  top: 0;
  left: 600px;
  background-color: #000;
  opacity: 0.6;
  z-index: 9;
`;

const Account = ({ dataFinalMap }) => {
  const { t } = useTranslation();
  const loadingMyScreams = useSelector((state) => state.data.loadingMyScreams);
  const [infoOpen, setInfoOpen] = useState(false);
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const selectedTopics = useSelector((state) => state.data.topics);
  const myScreams = useSelector((state) => state.data.myScreams);
  const user = useSelector((state) => state.user);
  const organizations = useSelector((state) => state.data.organizations);

  const [foundOrganizations, setFoundOrganizations] = useState(false);
  const [myOrganizations, setMyOrganizations] = useState([]);

  const [dropdown, setDropdown] = useState("newest");
  const [order, setOrder] = useState(1);
  const dispatch = useDispatch();

  const handleClose = () => {
    window.history.pushState(null, null, `/`);
    dispatch(closeAccountFunc());
    dispatch(handleTopicSelectorRedux("all"));
  };

  const handleClick = (order) => {
    setOrder(order);
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const screamsSearched = myScreams?.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtteil?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtbezirk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.locationHeader?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
  });

  const sortedScreams =
    dropdown === "newest"
      ? _.orderBy(screamsSearched, "createdAt", "desc")
      : _.orderBy(screamsSearched, "likeCount", "desc");

  const dataFinal = sortedScreams
    ? sortedScreams.filter(
        ({ Thema, status, lat, long }) =>
          selectedTopics.includes(Thema) &&
          lat <= mapBounds?.latitude1 &&
          lat >= mapBounds?.latitude2 &&
          long >= mapBounds?.longitude2 &&
          long <= mapBounds?.longitude3 &&
          status === "None"
      )
    : [];

  useEffect(async () => {
    const db = firebase.firestore();
    const ref = await db
      .collection("organizations")
      // .where("centerLat", "<", Number(mapViewport.latitude) + 1)
      // .where("centerLat", ">", Number(mapViewport.latitude) - 1)
      .orderBy("createdAt", "desc")
      .where("userIds", "array-contains", user.userId)
      .get();

    const organizations = [];

    ref.docs.forEach((doc) => {
      const docData = {
        ...doc.data(),
        organizationId: doc.id,
      };
      organizations.push(docData);

      if (organizations.length === ref.size) {
        setMyOrganizations(organizations);
        console.log(organizations);
      }
    });
  }, []);

  const dataFinalOrganizations = myOrganizations;

  return (
    <React.Fragment>
      <Header
        type="account"
        infoOpen={infoOpen}
        setInfoOpen={setInfoOpen}
        loading={loadingMyScreams}
        order={order}
        handleClose={handleClose}
        handleClick={handleClick}
      />
      {!isMobileCustom && order === 0 && <MapHider />}

      <Wrapper>
        <SwipeList
          swipeListType={order === 1 ? "ideas" : "organizationsOverview"}
          type="myIdeas"
          tabLabels={AccountTabData.map((item) => item.text).slice(
            0,
            myOrganizations.length > 0 ? 3 : 1
          )}
          loading={loadingMyScreams}
          order={order}
          handleClick={handleClick}
          dataFinal={order === 1 ? dataFinal : dataFinalOrganizations}
          dataFinalLength={dataFinal.length}
          viewport={mapViewport}
          handleDropdown={handleDropdown}
          dropdown={dropdown}
          dataFinalMap={dataFinalMap}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />

        {myScreams && (
          <InfoModal infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default Account;
