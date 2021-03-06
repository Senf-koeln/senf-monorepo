/* eslint-disable react/display-name */
/** @format */

import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "senf-atomic-design-system";
import styled from "styled-components";
import { closeScream } from "../../../redux/actions/screamActions";
import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { setSwipePositionUp } from "../../../redux/actions/UiActions";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  position: fixed;
  top: calc((var(--vh, 1vh) * 100) - 150px);
  display: flex;
  justify-content: center;
  pointer-events: none;

  transform: ${({ openMapFilter }) =>
    openMapFilter ? "scale(1)" : "scale(0.5)"};
  opacity: ${({ openMapFilter }) => (openMapFilter ? "1" : "0")};
  pointer-events: ${({ openMapFilter }) => (openMapFilter ? "all" : "none")};
  transition: 0.2s;

  @media (min-width: 768px) {
    justify-content: center;
    position: absolute;
    left: 470px;
    top: 18px;
    width: calc(100% - 470px);
  }
`;
const MapFilter = memo(
  ({ viewport, mapRef, openMapFilter, setSwipedUpState }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.data.loading);
    const initialMapBounds = useSelector(
      (state) => state.data.initialMapBounds
    );

    const initialMapViewport = useSelector(
      (state) => state.data.initialMapViewport
    );
    const [waitTime, setWaitTime] = useState(null);

    const handleMapBoundsSet = (viewport) => {
      const map = mapRef.current.getMap();
      const canvas = map.getCanvas();
      const w = canvas.width;
      const h = canvas.height;
      const NW = map.unproject([0, 0]).toArray();
      const SE = map.unproject([w, h]).toArray();
      const boundsRar = [NW, SE];

      const bounds = {
        latitude1: boundsRar[0][1],
        latitude2: boundsRar[1][1],
        longitude2: boundsRar[0][0],
        longitude3: boundsRar[1][0],
      };

      dispatch(setMapBounds(bounds));
      dispatch(setSwipePositionUp());
      setSwipedUpState(true);
      setWaitTime(true);

      setTimeout(() => {
        setWaitTime(null);
      }, 3000);

      dispatch(closeScream());

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    return (
      <Wrapper openMapFilter={!loading && openMapFilter && !waitTime}>
        <Button
          text={t("Ideen im Bereich anzeigen")}
          onClick={() => handleMapBoundsSet(viewport)}
          variant="white"
          size={isMobileCustom ? "small" : "big"}
        />
      </Wrapper>
    );
  }
);
export { MapFilter };
