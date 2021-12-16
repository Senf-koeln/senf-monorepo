/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import IdeaCard from "../Cards/IdeaCard";
import {
  NoMoreMainContent,
  NoMoreMyContent,
  NoMoreProjectsContent,
} from "./NoMoreContent";
import { isMobileCustom } from "../../../util/customDeviceDetect";

import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { usePrevious } from "../../../hooks/usePrevious";
import { ProjectCard } from "../Cards/ProjectCard";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  top: 0;
  pointer-events: all;
  animation: cardanimation 0.8s ease-in-out;

  @media (min-width: 768px) {
    width: 400px;
    top: 110px;
    position: relative;
  }
`;

const NoIdeasYet = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
`;
const List = ({
  swipeListType,
  type,
  loading,
  dropdown,
  dataFinal,
  dataFinalLength,
  projectsData,
}) => {
  const { t } = useTranslation();
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const prevdataFinalLength = usePrevious({ dataFinalLength });
  const prevDropdown = usePrevious({ dropdown });

  useEffect(() => {
    if (
      (dataFinalLength &&
        prevdataFinalLength &&
        prevdataFinalLength.dataFinalLength !== dataFinalLength) ||
      (dropdown && prevDropdown && prevDropdown.dropdown !== dropdown)
    ) {
      const element = document.getElementById("List");
      element?.scrollTo({
        top: 0,
        left: 0,
      });

      setListItems(1);
      sethasMoreItems(true);
    }
  }, [loading, dropdown, dataFinalLength]);
  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (dataFinal) => {
    var items = [];
    if (dataFinalLength !== 0) {
      for (var i = 0; i < listItems; i++) {
        if (swipeListType === "projectRoomOverview") {
          items.push(
            dataFinal[i]?.projectId && (
              <ProjectCard
                key={dataFinal[i]?.projectId}
                project={dataFinal[i]}
              />
            )
          );
        } else {
          items.push(
            dataFinal[i]?.screamId && (
              <IdeaCard
                loading={loading}
                key={dataFinal[i]?.screamId}
                title={dataFinal[i]?.title}
                body={dataFinal[i]?.body}
                screamId={dataFinal[i]?.screamId}
                likeCount={dataFinal[i]?.likeCount}
                commentCount={dataFinal[i]?.commentCount}
                Stadtteil={dataFinal[i]?.Stadtteil}
                project={dataFinal[i]?.project}
                color={dataFinal[i]?.color}
                projectsData={projectsData}
              />
            )
          );
        }
      }
      return items;
    }
  };

  const loadMore = () => {
    if (listItems === dataFinal.length) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
        //(posts.length-listItems)>10? setlistItems(listItems + 10):setlistItems(listItems+15);
      }, 100);
    }
  };

  return (
    !loading &&
    mapBounds && (
      <Wrapper id="List">
        <InfiniteScroll
          loadMore={() => loadMore()}
          hasMore={hasMoreItems}
          // loader={<SkeletonCard dataFinalLength={dataFinalLength === 0} />}
          useWindow={false}
        >
          {showItems(dataFinal)}
        </InfiniteScroll>

        {swipeListType === "ideas" &&
        !hasMoreItems | (dataFinalLength === 0) ? (
          <React.Fragment>
            {type === "myIdeas" ? (
              <NoMoreMyContent dataFinalLength={dataFinalLength} />
            ) : type === "projectIdeas" ? (
              <NoMoreProjectsContent dataFinalLength={dataFinalLength} />
            ) : (
              <NoMoreMainContent dataFinalLength={dataFinalLength} />
            )}
          </React.Fragment>
        ) : null}

        {swipeListType === "projectRoomOverview" && loading && (
          <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
        )}
        {swipeListType === "projectRoomOverview" &&
          !loading &&
          dataFinal.length === 0 && (
            <NoIdeasYet>{t("projectrooms_loading_error")}</NoIdeasYet>
          )}

        <div style={isMobileCustom ? { height: "70%" } : { height: "500px" }} />
      </Wrapper>
    )
  );
};

export default List;
