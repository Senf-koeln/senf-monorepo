/** @format */
import React, { useEffect, useState } from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import { useSelector, useDispatch } from "react-redux";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import styled from "styled-components";

//Components
import List from "../../molecules/List/List";
import Toolbar from "../../molecules/Toolbar/Toolbar";
import {
  setSwipePositionDown,
  setSwipePositionUp,
} from "../../../redux/actions/UiActions";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";

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

const SwipeList = ({
  swipeListType,
  type,
  loading,
  order,
  dropdown,
  handleDropdown,
  dataFinal,
  projectsData,
  zIndex,
  setSearchTerm,
  searchTerm,
}) => {
  const dispatch = useDispatch();
  const openScream = useSelector((state) => state.UI.openScream);
  const [searchOpen, setSearchOpen] = useState(false);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight - 120}px)`,
    overflow: "scroll",
    touchAction: "none",
    userSelect: "none",
  }));

  const setSwipeUp = () => {
    dispatch(setSwipePositionUp());
    set({
      transform: `translateY(${141}px)`,
      touchAction: "unset",
    });
  };

  const setSwipeDown = () => {
    dispatch(setSwipePositionDown());
    set({
      transform: `translateY(${window.innerHeight - 120}px)`,
      touchAction: "none",
    });
  };

  useEffect(() => {
    if (openScream) {
      set({
        transform: `translateY(${window.innerHeight + 20}px)`,
        touchAction: "none",
      });
    } else {
      if (swipePosition === "bottom") {
        set({
          transform: `translateY(${window.innerHeight - 120}px)`,
          touchAction: "none",
        });
      } else {
        set({
          transform: `translateY(${141}px)`,
          touchAction: "unset",
        });
      }
    }
  }, [openScream]);

  useEffect(() => {
    if (swipePosition === "bottom") {
      setSwipeDown();
    }
    if (swipePosition === "top") {
      setSwipeUp();
    }
  }, [swipePosition]);

  const bind = useDrag(
    ({ last, down, movement: [, my], offset: [, y] }) => {
      if (last && my > 50) {
        set({
          transform: `translateY(${window.innerHeight - 120}px)`,
          touchAction: "none",
        });
        dispatch(setSwipePositionDown());
      }

      if (last && my < -50) {
        set({
          transform: `translateY(${141}px)`,

          touchAction: "unset",
        });
        dispatch(setSwipePositionUp());
      }

      set({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
      },
    }
  );

  return isMobileCustom ? (
    <React.Fragment>
      <animated.div
        className={!loading && !openScream ? "drag" : "drag_hide"}
        style={props}
      >
        {mapBounds?.latitude1 !== 0 && (
          <React.Fragment>
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
                  swipeListType={swipeListType}
                  loading={loading}
                  handleDropdown={handleDropdown}
                  dataFinalLength={dataFinal.length}
                  setSearchOpen={setSearchOpen}
                  searchOpen={searchOpen}
                  setSearchTerm={setSearchTerm}
                  searchTerm={searchTerm}
                  handleClickSwipe={
                    swipePosition === "bottom"
                      ? () => setSwipeUp()
                      : () => setSwipeDown()
                  }
                />{" "}
              </animated.div>
            </ListHeaderWrapper>

            {searchOpen ? (
              <div style={{ height: "60px", transition: "0.5s" }} />
            ) : (
              <div style={{ height: "0px", transition: "0.5s" }} />
            )}
            {/* <ShadowBox display={shadow ? "block" : "none"} /> */}
            <List
              swipeListType={swipeListType}
              type={type}
              loading={loading}
              dropdown={dropdown}
              dataFinal={dataFinal}
              projectsData={projectsData}
            />
          </React.Fragment>
        )}
      </animated.div>
    </React.Fragment>
  ) : (
    <Content>
      <Background />
      <Toolbar
        swipeListType={swipeListType}
        loading={loading}
        handleDropdown={handleDropdown}
        dataFinalLength={dataFinal.length}
        setSearchOpen={setSearchOpen}
        searchOpen={searchOpen}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        type={type}
      />{" "}
      {searchOpen ? (
        <div style={{ height: "60px", transition: "0.5s" }} />
      ) : (
        <div style={{ height: "0px", transition: "0.5s" }} />
      )}
      <List
        swipeListType={swipeListType}
        type={type}
        loading={loading}
        dropdown={dropdown}
        dataFinal={dataFinal}
        projectsData={projectsData}
      />{" "}
    </Content>
  );
};

export default SwipeList;
