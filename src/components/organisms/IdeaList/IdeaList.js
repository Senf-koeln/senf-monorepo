/** @format */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import { useSelector, useDispatch } from "react-redux";

import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import styled from "styled-components";

//Components
import MapMobile from "../../atoms/map/MapMobile";
import List from "../../molecules/List/List";
import PostScream from "../PostIdea/PostScream";
import TopicFilter from "../../atoms/Filters/TopicFilter";
import Toolbar from "../../molecules/Toolbar/Toolbar";

const Wrapper = styled.div`
  opacity: 1;
  display: flex;
  flex-direction: row;
  transition: 0.5s;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: ${(props) => props.zIndex && props.zIndex};
`;

const Content = styled.div`
  margin-top: 0px;
  padding-bottom: 150px;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  top: 0;
`;

const ListHeaderWrapper = styled.div`
  height: 70px;
  width: 100%;
  background-color: #fed957;
  display: block;
  z-index: 15;
  top: 0;

  position: sticky;

  border-radius: 20px 20px 0 0;
`;

const ShadowBox = styled.div`
  width: 90%;
  margin-left: 5%;
  height: 70px;
  display: block;
  position: absolute;
  top: 0;

  box-shadow: rgb(38, 57, 77, 0.4) 0px 20px 30px -15px;
  z-index: 14;
  display: ${(props) => props.display && props.display};
`;

const IdeaList = ({
  type,
  loading,
  order,
  dropdown,
  handleDropdown,
  dataFinal,
  dataFinalLength,
  dataFinalMap,
  projectsData,
  geoData,
  loadingProjects,
  project,
  handleTopicSelector,
  topicsSelected,
  zIndex,
}) => {
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const openScream = useSelector((state) => state.UI.openScream);

  const dispatch = useDispatch();
  const [zoomBreak, setZoomBreak] = useState(0.6);

  const _onViewportChange = (viewport) => {
    dispatch(setMapViewport(viewport));
    if (viewport.zoom > 15) {
      setZoomBreak(2);
    } else if (viewport.zoom > 11.5) {
      setZoomBreak(1);
    } else {
      setZoomBreak(0.6);
    }

    const boundAdds = [500, 1000, 500, 1000];
    dispatch(setMapBounds(viewport, boundAdds));
  };

  const [swipePosition, setSwipePosition] = useState("bottom");
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight - 120}px)`,
    overflow: "scroll",
    touchAction: "none",
  }));

  const setSwipePositionUp = () => {
    setSwipePosition("top");
    set({
      y: 0,
      transform: `translateY(${141}px)`,
      touchAction: "unset",
    });
  };

  const setSwipePositionDown = () => {
    setSwipePosition("bottom");
    set({
      y: 0,
      transform: `translateY(${window.innerHeight - 120}px)`,
      touchAction: "none",
    });
  };

  useEffect(() => {
    if (openScream) {
      set({
        opacity: "0",
        pointerEvents: "none",
      });
    } else {
      set({
        opacity: "1",
        pointerEvents: "auto",
      });
    }
  }, [openScream]);

  const bind = useDrag(
    ({ currentTarget, down, movement: [, my], offset: [, y] }) => {
      console.log(currentTarget);
      if (my < -100) {
        set({
          y: down ? my : 0,
          transform:
            !down && swipePosition !== "bottom"
              ? `translateY(${141}px)`
              : `translateY(${window.innerHeight - 120}px)`,
          touchAction: "unset",
        });
        setSwipePosition("top");
      }
      if (my > 150) {
        set({
          y: down ? my : window.innerHeight - 120,
          transform: down
            ? `translateY(${0}px)`
            : `translateY(${window.innerHeight - 120}px)`,
          touchAction: "none",
        });
        setSwipePosition("bottom");
      }

      set({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
        top: -window.innerHeight + 341,
        bottom: swipePosition === "bottom" ? 20 : window.innerHeight - 120,
      },
    }
  );

  return order === 1 ? (
    <Wrapper zIndex={zIndex}>
      {" "}
      {isMobileCustom ? (
        <React.Fragment>
          <div style={{ height: "100vh" }}>
            <MapMobile
              dataFinal={dataFinalMap}
              geoData={geoData}
              viewport={mapViewport}
              _onViewportChange={_onViewportChange}
              setSwipePositionUp={() => setSwipePositionUp()}
              zoomBreak={zoomBreak}
            />
          </div>
          <TopicFilter
            loading={loading}
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
            swipePosition={swipePosition}
            setSwipePositionDown={() => setSwipePositionDown()}
          ></TopicFilter>{" "}
          <PostScream
            loadingProjects={loadingProjects}
            projectsData={projectsData}
            project={project}
          />
          <animated.div className={!loading ? "drag" : ""} style={props}>
            <ListHeaderWrapper>
              <animated.div
                {...bind()}
                style={props}
                style={{
                  backgroundColor: "#fed957",
                  height: "70px",
                  pointerEvents: "none",
                }}
              >
                <Toolbar
                  loading={loading}
                  handleDropdown={handleDropdown}
                  dataFinalLength={dataFinalLength}
                  handleClickSwipe={
                    swipePosition === "bottom"
                      ? () => setSwipePositionUp()
                      : () => setSwipePositionDown()
                  }
                />{" "}
              </animated.div>
            </ListHeaderWrapper>
            {/* <ShadowBox display={shadow ? "block" : "none"} /> */}
            <List
              type={type}
              loading={loading}
              dropdown={dropdown}
              dataFinal={dataFinal}
              dataFinalLength={dataFinalLength}
              projectsData={projectsData}
            />
          </animated.div>
        </React.Fragment>
      ) : (
        <Content>
          <Toolbar
            loading={loading}
            handleDropdown={handleDropdown}
            dataFinalLength={dataFinalLength}
            type={type}
          />{" "}
          <List
            type={type}
            loading={loading}
            dropdown={dropdown}
            dataFinal={dataFinal}
            dataFinalLength={dataFinalLength}
            projectsData={projectsData}
          />{" "}
        </Content>
      )}{" "}
    </Wrapper>
  ) : null;
};

export default IdeaList;
