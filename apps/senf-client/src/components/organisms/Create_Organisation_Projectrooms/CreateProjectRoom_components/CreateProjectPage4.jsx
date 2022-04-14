/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import MapDialog from "../Components/MapDialog";

import DrawMapImage from "../../../../images/drawMap.jpg";
import MapPreview from "../Components/MapPreview";
import {
  ComponentWrapper,
  ComponentInnerWrapper,
} from "../styles/sharedStyles";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/storage";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";

const DrawMapButton = styled.label`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-left: calc(50% - 75px);
`;

const StyledImg = styled.img`
  flex-shrink: 0;
  width: 200px;
  object-fit: cover;
`;

const CreateProjectPage4 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const [mapOpen, setMapOpen] = useState(false);
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState(null);
  const [data, setData] = useState(null);

  const _onViewportChange = (viewport) => {
    setViewport(viewport);
  };

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createProjectRoomId")
      ) {
        const ref = await db
          .collection("organizations")
          .doc(localStorage.getItem("createProjectRoomOrganizationId"))
          .collection("projectRooms")
          .doc(localStorage.getItem("createProjectRoomId"))
          .get();

        if (!ref.exists) {
          console.log("No such document!");
        } else {
          const data = ref.data();
          if (data.geoData) {
            setData(JSON.parse(data.geoData));
          }
          if (data.centerLong) {
            setViewport({
              latitude: data.centerLat,
              longitude: data.centerLong,
              zoom: data.zoom,
              pitch: 0,
            });
          } else {
            const viewport = {
              zoom: mapViewport.zoom,
              latitude: mapViewport.latitude,
              longitude: mapViewport.longitude,
              transitionDuration: 1000,
            };
            setViewport(viewport);
          }
        }
      }
    }
    fetchData();
  }, []);

  const handleNext = () => {
    setNextClicked(true);

    setTimeout(() => {
      if (localStorage.getItem("createProjectRoomPostEdit") === "true") {
        set(pagesData.length - 1);
      } else {
        onClickNext();
      }
    }, 200);
  };

  return (
    <React.Fragment>
      {/* <MapDialog
        mapOpen={mapOpen}
        setMapOpen={setMapOpen}
        viewport={viewport}
        mapRef={mapRef}
        _onViewportChange={_onViewportChange}
        data={data}
        setData={setData}
        setViewport={setViewport}
      /> */}

      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>

          <DrawMapButton onClick={setMapOpen}>
            {data ? (
              <MapPreview
                mapOpen={mapOpen}
                setMapOpen={setMapOpen}
                viewport={viewport}
                mapRef={mapRef}
                _onViewportChange={_onViewportChange}
                data={data}
                setData={setData}
              />
            ) : (
              <StyledImg src={DrawMapImage} />
            )}
          </DrawMapButton>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        disabled={!data || nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage4;
