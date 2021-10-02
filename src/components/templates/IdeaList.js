/** @format */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { isMobileCustom } from "../../util/customDeviceDetect";

import { useSelector, useDispatch } from "react-redux";
import { setMapBounds, setMapViewport } from "../../redux/actions/mapActions";

import styled, { keyframes } from "styled-components";
import Swipe from "react-easy-swipe";

//Components
import MapMobile from "../module/map/MapMobile";
import List from "../module/List/List";
import ListHeader from "../module/Headers/ListHeader";
import PostScream from "../postScream/PostScream";
import TopicFilter from "../module/Filters/TopicFilter";

const ListEnterAnimation = keyframes`
       0% {
  transform: translateY(100%) ; 
}

100% {
  transform: translateY(0%) ; 
}
    `;

const Wrapper = styled.div`
  opacity: 1;
  display: flex;
  flex-direction: row;
  transition: 0.5s;
  width: 100%;
`;

const ScrollContainer = styled.div`
  height: 150%;
  width: 100%;

  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(255, 218, 83, 1) 25%,
    rgba(255, 255, 255, 1) 50%
  );
  position: fixed;
  border-radius: 20px 20px 0 0;
  z-index: 9;
  top: ${(props) => props.Top && props.Top};
  will-change: transform;
  transform: translateY(
    ${(props) => {
      return props.marginTop && props.marginTop + "px";
    }}
  );

  animation: ${ListEnterAnimation} 3s;
  box-shadow: 0 8px 40px 12px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  margin-top: 0px;
  padding-bottom: 150px;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  top: 0;
`;

const ContentMobile = styled(Content)`
  position: absolute;
  overflow: scroll;
`;

const SwipeContainer = styled.div`
  position: fixed;

  width: 100%;
  z-index: 15;
  height: ${(props) => (props.Top && props.Top === "141px" ? "70px" : "30%")};
`;

const ListHeaderWrapper = styled.div`
  height: 70px;
  width: 100%;
  background-color: #fed957;
  display: block;
  position: sticky;
  z-index: 15;
  top: 0;

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
  dataFinalMap,
  projectsData,
  geoData,
  loadingProjects,
  project,
  myScreams,
  handleTopicSelector,
  topicsSelected,
}) => {
  const [swipePosition, setSwipePosition] = useState("70%");
  const [swipeMovePosition, setSwipeMovePosition] = useState(0);
  const [shadow, setShadow] = useState(false);

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const dispatch = useDispatch();

  const onSwipeMove = (position, event) => {
    setSwipeMovePosition(position.y);
  };

  const onSwipeEnd = (position, event) => {
    console.log(position.y);
    if (swipeMovePosition < -50) {
      setSwipePosition("141px");
      setSwipeMovePosition(0);
    } else if (swipePosition === "70%" && swipeMovePosition > 50) {
      setSwipePosition("calc(100% - 95px)");
      setSwipeMovePosition(0);
    } else if (swipeMovePosition > 50) {
      setSwipePosition("70%");
      setSwipeMovePosition(0);
    } else {
      //  setSwipePosition("70%");
      setSwipeMovePosition(0);
    }
  };

  const _onViewportChange = (viewport) => {
    dispatch(setMapViewport(viewport));

    const boundAdds = [500, 1000, 500, 1000];
    dispatch(setMapBounds(viewport, boundAdds));

    setSwipePosition("calc(100% - 95px)");
    setSwipeMovePosition(0);
  };

  const handleScroll = (e) => {
    const element = e.target;

    if (element.scrollTop > 5) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  return order === 1 ? (
    <Wrapper>
      {" "}
      {isMobileCustom ? (
        <React.Fragment>
          <MapMobile
            dataFinal={dataFinalMap}
            geoData={geoData}
            viewport={mapViewport}
            _onViewportChange={_onViewportChange}
            setSwipePosition={setSwipePosition}
          />
          <TopicFilter
            loading={loading}
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
            swipePosition={swipePosition}
            setSwipePosition={setSwipePosition}
          ></TopicFilter>
          <PostScream
            loadingProjects={loadingProjects}
            projectsData={projectsData}
            project={project}
            swipePosition={swipePosition}
          />
          <ScrollContainer
            Top={swipePosition}
            marginTop={swipeMovePosition}
            onScroll={handleScroll}
          >
            <ContentMobile>
              <Swipe
                onSwipeMove={onSwipeMove}
                onSwipeEnd={onSwipeEnd}
                style={{
                  height: "70px",
                }}
              >
                <SwipeContainer
                  Top={swipePosition}
                  marginTop={swipeMovePosition}
                  onClick={() => setSwipePosition("141px")}
                >
                  <ListHeaderWrapper
                    Top={swipePosition}
                    marginTop={swipeMovePosition}
                  >
                    <ListHeader
                      loading={loading}
                      handleDropdown={handleDropdown}
                      dataFinal={dataFinal}
                      marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
                    />{" "}
                  </ListHeaderWrapper>
                  <ShadowBox
                    Top={swipePosition}
                    marginTop={swipeMovePosition}
                    display={shadow ? "block" : "none"}
                  />
                </SwipeContainer>
              </Swipe>{" "}
              <List
                type={type}
                loading={loading}
                dropdown={dropdown}
                dataFinal={dataFinal}
                projectsData={projectsData}
                project={project}
                myScreams={myScreams}
              />{" "}
            </ContentMobile>{" "}
          </ScrollContainer>{" "}
        </React.Fragment>
      ) : (
        <Content>
          <ListHeader
            loading={loading}
            handleDropdown={handleDropdown}
            dataFinal={dataFinal}
            marginTop={document.body.clientWidth > 768 ? "40px" : "0"}
          />
          <List
            type={type}
            loading={loading}
            dropdown={dropdown}
            dataFinal={dataFinal}
            projectsData={projectsData}
            project={project}
            myScreams={myScreams}
          />{" "}
        </Content>
      )}{" "}
    </Wrapper>
  ) : null;
};

export default IdeaList;
