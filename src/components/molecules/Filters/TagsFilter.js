/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import {
  handleTopicSelectorRedux,
  handleOrganizationTypesSelectorRedux,
} from "../../../redux/actions/UiActions";
import topics from "../../../data/topics";
import organizationTypes from "../../../data/organizationTypes";

import { useTranslation } from "react-i18next";

import styled from "styled-components";

const FilterWrapperMobile = styled.div`
  z-index: 15;
  position: relative;

  top: ${(props) =>
    props.openScream
      ? "15px"
      : props.placing === "list"
      ? "0px"
      : props.placing === "insights"
      ? "20px"
      : props.moveUp
      ? "-90px"
      : "60px"};
  width: 100%;

  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  transition: 1s;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-top: -20px;
  padding-left: ${(props) => (props.openScream ? "60px" : "0px")};
  animation: FilterWrapperMobileAnimation 1s;
  @keyframes FilterWrapperMobileAnimation {
    0% {
      margin-left: 100%;
    }

    100% {
      margin-left: 10px;
    }
  }

  @media (min-width: 768px) {
    top: 0;
    padding-left: 0;
    padding-bottom: 0;
  }
`;

const FilterInnerWrapperMobile = styled.div`
  padding-left: 10px;
  padding-right: 20px;
  margin: 5px;
  margin-left: 10px;

  display: flex;
  flex-direction: row;
  width: max-content;

  @media (min-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: ${(props) => (props.column ? "column" : "row")};
    flex-wrap: wrap;
    padding: 0px;
    margin-left: 0;
  }
`;

const Tag = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  padding-right: 10px;
  margin-right: 5px;
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.placing !== "list" && props.placing !== "insights"
      ? "0 8px 30px -12px rgba(0, 0, 0, 0.8)"
      : "none"};
  background-color: ${(props) =>
    props.checked
      ? ` white`
      : props.placing !== "list"
      ? "#ECECEC"
      : "#FFE898"};
  outline-offset: -2px;

  @media (min-width: 768px) {
    box-shadow: none;
    margin-top: 5px;
  }
`;

export function TagsFilter({ loading, placing, type, inline, column }) {
  const openScream = useSelector((state) => state.UI.openScream);
  const selectedTopics = useSelector((state) => state.data.topics);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );
  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const [moveLeft, setMoveLeft] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (openScream) {
      setMoveLeft(false);
    }
  }, [openScream]);

  return (
    !loading &&
    !inline && (
      <FilterWrapperMobile
        openScream={openScream}
        id="Wrapper"
        placing={placing}
        moveUp={swipePosition === "top"}
      >
        <FilterInnerWrapperMobile>
          <Tag
            placing={placing}
            onClick={
              type === "topics"
                ? () => dispatch(handleTopicSelectorRedux("all"))
                : () => dispatch(handleOrganizationTypesSelectorRedux("all"))
            }
            checked={
              type === "topics"
                ? selectedTopics.length === 7
                : selectedOrganizationTypes.length === 7
            }
            color="#000000"
          >
            <Checkbox
              color="default"
              icon={<FiberManualRecordIcon />}
              style={{ color: "#000000" }}
            />

            {type === "topics" ? t("topics_all") : t("organizationTypes_all")}
          </Tag>
          {type === "topics"
            ? topics.map((topic, i) => (
                <Tag
                  placing={placing}
                  onClick={() => dispatch(handleTopicSelectorRedux(topic.name))}
                  checked={
                    selectedTopics.includes(topic.name) &&
                    selectedTopics.length !== 7
                  }
                  color={topic.color}
                >
                  <Checkbox
                    color="default"
                    icon={<FiberManualRecordIcon />}
                    data-cy={topic.name}
                    style={{ color: topic.color }}
                  />

                  {topic.label}
                </Tag>
              ))
            : organizationTypes.map((organizationTypes, i) => (
                <Tag
                  placing={placing}
                  onClick={() =>
                    dispatch(
                      handleOrganizationTypesSelectorRedux(
                        organizationTypes.name
                      )
                    )
                  }
                  checked={
                    selectedOrganizationTypes.includes(
                      organizationTypes.name
                    ) && selectedOrganizationTypes.length !== 7
                  }
                  color={organizationTypes.color}
                >
                  <Checkbox
                    color="default"
                    icon={<FiberManualRecordIcon />}
                    data-cy={organizationTypes.name}
                    style={{ color: organizationTypes.color }}
                  />

                  {organizationTypes.label}
                </Tag>
              ))}
        </FilterInnerWrapperMobile>
      </FilterWrapperMobile>
    )
  );
}

export default React.memo(TagsFilter);