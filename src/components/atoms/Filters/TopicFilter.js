/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import topics from "../../../data/topics";
import { useTranslation } from "react-i18next";

import styled, { keyframes } from "styled-components";

const enterAnimation = keyframes`
       0% {
        margin-left: 100%;
}
30% {
        margin-left: 100%;
}


100% {
  margin-left: calc(100% - 120px);
}
    `;
const TopicFilterWrapperMobile = styled.div`
  z-index: 15;
  position: fixed;

  top: ${(props) => (props.openScream ? "10px" : "90px")};
  width: 100%;
  overflow-x: scroll;

  -webkit-overflow-scrolling: touch;
  transition: 1s;
`;

const MapClickContainer = styled.div`
  position: absolute;
  width: calc(100% - 120px);
  height: 50px;
  z-index: 9;
`;

const OpenButtonMobile = styled.div`
  position: absolute;
  width: 120px;
  margin-left: 0;
  left: 0;
  top: 0;
  height: 50px;
  z-index: 9;
  display: ${(props) => (props.hide ? "block" : "none")};
`;

const TopicFilterInnerWrapperMobile = styled.div`
  width: 880px;

  border-radius: 20px 0 0 20px;
  backdrop-filter: blur(5px);
  background-color: rgb(0, 0, 0, 0.1);
  padding: 5px;
  padding-left: 20px;
  padding-right: 0px;
  margin: 5px;
  margin-left: calc(100% - 120px);
  animation: ${enterAnimation} 3.5s;
  z-index: 15;
`;

const TopicFilterWrapperDesktop = styled.div`
  position: relative;
  width: 100%;
  left: 20px;
  top: 70px;
  background-color: transparent;
  padding: 0px;
  height: auto;
`;

export function TopicFilter({
  handleTopicSelector,
  topicsSelected,
  loading,
  swipePosition,
  setSwipePositionDown,
  inline,
}) {
  const openScream = useSelector((state) => state.UI.openScream);
  const [moveLeft, setMoveLeft] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (openScream) {
      setMoveLeft(false);
    }
  }, [openScream]);

  useEffect(() => {
    if (isMobileCustom && !inline) {
      const el = document.getElementById("Wrapper");
      if (moveLeft) {
        el.scroll({
          top: 0,
          left: window.innerWidth - 125,
          behavior: "smooth",
        });
      } else {
        el.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [moveLeft]);

  // Handler at index 0 is for the "all" checkbox
  const topicFilters = topics.map((topic, i) => {
    return (
      <Checkbox
        color="default"
        icon={<FiberManualRecordIcon />}
        checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
        onChange={() => handleTopicSelector(topic.name)}
        data-cy={topic.name}
        checked={
          topicsSelected.includes(topic.name) && topicsSelected.length !== 7
        }
        style={{ color: topic.color }}
      />
    );
  });

  return isMobileCustom && !loading && !inline ? (
    <TopicFilterWrapperMobile openScream={openScream} id="Wrapper">
      {swipePosition === "top" && (
        <MapClickContainer onClick={setSwipePositionDown} />
      )}

      <TopicFilterInnerWrapperMobile>
        <OpenButtonMobile
          onClick={() => setMoveLeft(!moveLeft)}
          hide={topicsSelected.length === 7}
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<FiberManualRecordIcon />}
              checkedIcon={
                <FiberManualRecordIcon className="activelegenditem" />
              }
              data-cy="topic-all"
              onChange={() => handleTopicSelector("all")}
              checked={topicsSelected.length === 7}
              style={{ color: "#000000" }}
            />
          }
          label={t("topics_all")}
        />
        {topics.map((topic, i) => (
          <FormControlLabel
            key={`${topic.name}-${i}`}
            control={topicFilters[i]}
            label={topic.label}
          />
        ))}
      </TopicFilterInnerWrapperMobile>
    </TopicFilterWrapperMobile>
  ) : (
    <TopicFilterWrapperDesktop>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FiberManualRecordIcon />}
            checkedIcon={<FiberManualRecordIcon className="activelegenditem" />}
            data-cy="topic-all"
            onChange={() => handleTopicSelector("all")}
            checked={topicsSelected.length === 7}
            style={{ color: "#000000" }}
          />
        }
        label={t("topics_all")}
      />
      {topics.map((topic, i) => (
        <FormControlLabel
          key={`${topic.name}-${i}`}
          control={topicFilters[i]}
          label={topic.label}
        />
      ))}
    </TopicFilterWrapperDesktop>
  );
}

export default TopicFilter;
