/** @format */

import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import {
  Covers,
  CoverWrapper,
  Wrapper,
  HeaderWrapper,
  SVGWrapper,
  SVGWrapperMobile,
  ClickBackground,
  DragWrapper,
  HandleBar,
} from "./styles/sharedStyles";
import { TagsFilter } from "../../molecules/Filters/TagsFilter";
import { MenuData } from "../../../data/MenuData";
import { StyledH2 } from "../../../styles/GlobalStyle";
import Tabs from "../../atoms/Tabs/Tabs";
import { usePrevious } from "../../../../src/hooks/usePrevious";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import NewButton from "../../atoms/CustomButtons/NewButton";
import { stateCreateOrganizationsFunc } from "../../../redux/actions/organizationActions";
import List from "../../molecules/List/List";

const InnerWrapper = styled.div`
  overflow-y: scroll;
  pointer-events: all;
  height: calc(100% - 120px);
  width: 100%;
  margin-top: ${(props) => (props.isMobileCustom ? "-10px" : "0px")};
  overflow: scroll;
  z-index: 1;
  margin-left: 50%;
  padding-bottom: 200px;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 800px;

  display: flex;
  flex-direction: column;
`;

const ListWrapper = styled.div`
  padding-bottom: 200px;
`;

const NoIdeasYet = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  width: calc(100% - 20px);
  margin: 0px 10px;

  @media (min-width: 768px) {
    width: 300px;
    position: fixed;
    top: 112px;
    right: 60px;
  }
`;
const TabsWrapper = styled.div`
  margin-left: 20px;
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
  dataFinalProjectRooms,
}) => {
  const { t } = useTranslation();

  const [searchOpen, setSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setOpen(true);
    // window.history.pushState(null, null, "/organizations");
  }, []);

  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${30}px)`,
    overflow: "hidden",
    touchAction: "none",
    userSelect: "none",
  }));

  const bind = useDrag(
    ({ last, down, movement: [, my], offset: [, y] }) => {
      if (last && my > 50) {
        set({
          transform: `translateY(${window.innerHeight}px)`,
          touchAction: "none",
        });

        setTimeout(() => {
          window.history.pushState(null, null, "/projectRooms");
          setOpenOrganizationsPage(false);
        }, 150);
        setTimeout(() => {
          set({
            transform: `translateY(${30}px)`,
            touchAction: "none",
          });
        }, 300);
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

  const setClose = () => {
    set({
      transform: `translateY(${window.innerHeight}px)`,
      touchAction: "none",
    });
    setTimeout(() => {
      window.history.pushState(null, null, "/projectRooms");

      setOpenOrganizationsPage(false);
    }, 150);
  };

  const dataFinalLength = dataFinal.length;

  const openCreateOrganization = () => {
    dispatch(stateCreateOrganizationsFunc(true));
  };

  const openRequestOrganization = () => {
    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Anfrage: Anlegen eines Organisationsprofils");

    window.location.href = link;
  };
  return !loading && isMobileCustom ? (
    <React.Fragment>
      <ClickBackground onClick={setClose} />

      <DragWrapper className={!loading ? "" : "drag_hide"} style={props}>
        <HeaderWrapper {...bind()}>
          <HandleBar />
          <CustomIconButton
            name="ArrowDown"
            position="fixed"
            margin="0px 0px"
            backgroundColor="transparent"
            shadow={false}
            handleButtonClick={setClose}
            zIndex={99}
          />
          <TabsWrapper>
            <StyledH2
              fontWeight="900"
              fontSize={document.body.clientWidth > 368 ? "22px" : "19px"}
              textAlign="center"
              margin="10px 0px"
            >
              {MenuData.map((item) => item.text).slice(2, 3)}
            </StyledH2>
          </TabsWrapper>

          <TagsFilter
            placing="list"
            type={order === 1 ? "topics" : "organizationType"}
          />
          <SVGWrapperMobile>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100% 100%"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M139 84.5C65 68.9 22 91 0 107.5V0H390.5V54C363.5 45.5 334 47 313.5 63.5C288.5 83.6219 231.5 104 139 84.5Z"
                fill="#FED957"
              />
            </svg>
          </SVGWrapperMobile>
        </HeaderWrapper>
        <InnerWrapper isMobileCustom={isMobileCustom}>
          <Toolbar
            swipeListType="organizationsOverview"
            type="standalone"
            loading={loading}
            handleDropdown={handleDropdown}
            dropdown={dropdown}
            dataFinalLength={dataFinalLength}
            setSearchOpen={setSearchOpen}
            searchOpen={searchOpen}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />

          <ButtonWrapper>
            <NewButton
              borderType="dashed"
              handleButtonClick={
                user.authenticated && user.handle === "Senf.koeln"
                  ? openCreateOrganization
                  : openRequestOrganization
              }
              // handleButtonClick={
              //   user.authenticated
              //     ? openCreateOrganization
              //     : () =>
              //         alert("Bitte melde dich erst mit deinem Senf-Account an!")
              // }
            >
              Organisationsprofil anlegen
            </NewButton>
          </ButtonWrapper>

          <ListWrapper>
            <List
              swipeListType="organizationsOverview"
              type="organizationsOverview"
              loading={loading}
              dropdown={dropdown}
              dataFinal={dataFinal}
              projectsData={dataFinalProjectRooms}
            />
          </ListWrapper>
        </InnerWrapper>
      </DragWrapper>
    </React.Fragment>
  ) : (
    !loading && (
      <Wrapper order={open}>
        <CustomIconButton
          name="ArrowLeft"
          position="fixed"
          margin="10px"
          backgroundColor="#FFF0BC"
          handleButtonClick={() => setOpenOrganizationsPage(false)}
          zIndex={99}
        />
        <SVGWrapper searchOpen={searchOpen}>
          <HeaderWrapper>
            <StyledH2
              fontWeight="900"
              fontSize={document.body.clientWidth > 368 ? "22px" : "19px"}
              textAlign="center"
              margin="20px 0px 40px 0px"
            >
              {MenuData.map((item) => item.text).slice(2, 3)}
            </StyledH2>

            <Toolbar
              swipeListType="organizationsOverview"
              marginTop="0px"
              loading={loading}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dataFinalLength={dataFinalLength}
              setSearchOpen={setSearchOpen}
              searchOpen={searchOpen}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />

            <ButtonWrapper>
              <NewButton
                borderType="dashed"
                handleButtonClick={
                  user.authenticated && user.handle === "Senf.koeln"
                    ? openCreateOrganization
                    : openRequestOrganization
                }
                // handleButtonClick={
                //   user.authenticated
                //     ? openCreateOrganization
                //     : () =>
                //         alert(
                //           "Bitte melde dich erst mit deinem Senf-Account an!"
                //         )
                // }
              >
                Organisationsprofil anlegen
              </NewButton>
            </ButtonWrapper>
          </HeaderWrapper>
          <svg
            width="100%"
            height="126"
            viewBox="0 0 1100 126"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 125.5V0.5H1130.5V99C1025 143 974.588 95.9476 942.5 83C828.5 37 819 43.5 704 62.5C558 86.6217 307.5 44.5 196 99C128.785 131.854 37.1667 124.667 0 125.5Z"
              fill="#FED957"
            />
          </svg>
        </SVGWrapper>

        <InnerWrapper isMobileCustom={isMobileCustom}>
          <List
            swipeListType="organizationsOverview"
            type="organizationsOverview"
            loading={loading}
            dropdown={dropdown}
            dataFinal={dataFinal}
            projectsData={dataFinalProjectRooms}
          />
        </InnerWrapper>
      </Wrapper>
    )
  );
};

export default OrganizationsPage;
