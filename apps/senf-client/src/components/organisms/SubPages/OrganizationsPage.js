/** @format */

import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import firebase from "firebase/app";
import "firebase/firestore";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { OrganizationCard } from "../../molecules/Cards/OrganizationCard";
import { openOrganizationFunc } from "../../../redux/actions/organizationActions";
import InfiniteScroll from "react-infinite-scroller";
import Toolbar from "../../molecules/Toolbar/Toolbar";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { Covers, CoverWrapper, Wrapper } from "./styles/sharedStyles";
import { TagsFilter } from "../../molecules/Filters/TagsFilter";
import { MenuData } from "../../../data/MenuData";
import { StyledH2 } from "../../../styles/GlobalStyle";
import Tabs from "../../atoms/Tabs/Tabs";
import { usePrevious } from "apps/senf-client/src/hooks/usePrevious";

const InnerWrapper = styled.div`
  overflow-y: scroll;
  pointer-events: all;
  height: calc(100% - 120px);
  width: 100%;
  margin-top: ${(props) => (props.isMobileCustom ? "0px" : "0px")};
  overflow: scroll;
  background-color: #ffe898;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  width: 100%;
  top: 20px;
  background-color: #fed957;
  z-index: 25;
  height: 100px;
  @media (min-width: 768px) {
    width: 600px;
    height: 120px;
    margin-left: 50%;
    transform: translateX(-50%);
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

const OrganizationsPage = ({
  setOpenOrganizationsPage,
  order,
  loading,
  dataFinal,
  dropdown,
  handleDropdown,
  setDropdown,
  searchTerm,
  setSearchTerm,
}) => {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const loadingOrganizations = useSelector(
    (state) => state.data.loadingOrganizations
  );

  const dataFinalLength = dataFinal.length;
  const prevdataFinalLength = usePrevious({ dataFinalLength });
  const prevDropdown = usePrevious({ dropdown });

  useEffect(() => {
    if (
      (dataFinalLength &&
        prevdataFinalLength &&
        prevdataFinalLength.dataFinalLength !== dataFinalLength) ||
      (dropdown && prevDropdown && prevDropdown.dropdown !== dropdown)
    ) {
      console.log(dataFinalLength);
      setListItems(1);
      sethasMoreItems(true);
    }
  }, [loadingOrganizations, dropdown, dataFinalLength]);

  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (dataFinal) => {
    var items = [];

    for (var i = 0; i < listItems; i++) {
      items.push(
        dataFinal[i]?.organizationId && (
          <OrganizationCard
            key={dataFinal[i]?.organizationId}
            organization={dataFinal[i]}
          />
        )
      );
    }
    return items;
  };

  const loadMore = () => {
    if (listItems === dataFinal.length) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
      }, 100);
    }
  };

  return (
    !loadingOrganizations && (
      <Wrapper order={open}>
        <CustomIconButton
          name="ArrowLeft"
          position="fixed"
          margin="10px"
          backgroundColor="#FFF0BC"
          handleButtonClick={() => setOpenOrganizationsPage(false)}
          zIndex={99}
        />

        <HeaderWrapper>
          <Tabs
            loading={false}
            order={1}
            tabLabels={MenuData.map((item) => item.text).slice(2, 3)}
            marginTop={"20px"}
            marginBottom={"20px"}
          />

          {isMobileCustom && (
            <TagsFilter
              placing="list"
              type={order === 1 ? "topics" : "organizationType"}
            />
          )}

          {!isMobileCustom && (
            <Toolbar
              swipeListType="organizationOverview"
              marginTop="0px"
              loading={loadingOrganizations}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dataFinalLength={dataFinalLength}
              setSearchOpen={setSearchOpen}
              searchOpen={searchOpen}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}
        </HeaderWrapper>
        <InnerWrapper isMobileCustom={isMobileCustom}>
          {isMobileCustom && (
            <Toolbar
              swipeListType="organizationOverview"
              type="standalone"
              loading={loadingOrganizations}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dataFinalLength={dataFinalLength}
              setSearchOpen={setSearchOpen}
              searchOpen={searchOpen}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}

          {!loadingOrganizations ? (
            <InfiniteScroll
              loadMore={() => loadMore()}
              hasMore={hasMoreItems}
              useWindow={false}
            >
              <CoverWrapper>{showItems(dataFinal)}</CoverWrapper>
            </InfiniteScroll>
          ) : (
            <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
          )}
        </InnerWrapper>
      </Wrapper>
    )
  );
};

export default OrganizationsPage;
