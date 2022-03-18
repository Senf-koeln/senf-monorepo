/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// Redux stuff
import { clearErrors } from "../../../redux/actions/errorsActions";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import Header from "../../molecules/Headers/Header";
import InfoModal from "../../molecules/DialogInlineComponents/InfoModal";
import styled from "styled-components";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import {
  openOrganizationFunc,
  stateCreateOrganizationsFunc,
} from "../../../redux/actions/organizationActions";
import SwipeList from "../SwipeLists/SwipeList";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { useTranslation } from "react-i18next";
import { MenuData } from "../../../data/MenuData";
import CalendarComponent from "../../atoms/calendar/CalendarComponent";
import {
  StyledA,
  StyledH2,
  StyledH3,
  StyledText,
} from "../../../../src/styles/GlobalStyle";
import setIconByOrganizationType from "../../../data/setIconByOrganizationType";
import NewButton from "../../atoms/CustomButtons/NewButton";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import Loader from "../../atoms/Backgrounds/Loader";
import List from "../../molecules/List/List";
import { SVGWrapper } from "../../molecules/Headers/styles/sharedStyles";
import MainModal from "../../atoms/Layout/MainModal";
import Tabs from "../../atoms/Tabs/Tabs";
import { OrganizationTabData } from "../../../data/OrganizationTabData";
import { Accordion } from "../../molecules/Accordion/Accordion";
import Arrow from "../../../images/icons/arrow-right.png";
import { openLink, openMail } from "../../../util/helpers";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 0vh;
  z-index: 996;
  top: 0;
  position: fixed;
  pointer-events: all;
  overflow-y: scroll;
  overflow-x: hidden;

  background-color: rgb(249, 241, 215);
  /* animation: OrganizationPageAnimation 0.2s; */

  @media (min-width: 768px) {
    margin-left: 0px;
    width: 400px;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 990;
    top: 0;
    position: fixed;
    transition: 0.5s;
    left: calc(100vw - 400px);
    box-shadow: 0 8px 30px -12px rgba(0, 0, 0, 0.9);
  }

  /* @keyframes OrganizationPageAnimation {
  0% {
    left: 50vw;
    opacity: 0;
  }
  100% {
    left: 0vw;
    opacity: 1;
  }
} */
`;

const CalendarWrapper = styled.div`
  position: fixed;
  padding-top: 50px;
  top: 0;
  right: 400px;
  background-color: #fed957;
  border-left: 2px solid white;
  z-index: 999;
`;

const InfoWidget = styled.div`
  width: 350px;
  max-width: calc(100% - 50px);
  height: auto; /* 72px */
  width: 348px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  font-weight: 500;
  font-style: normal;
  font-family: "Nunito", serif;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  letter-spacing: 0px;
  line-height: 1.5;
  text-align: left;

  margin: 0px 16px 0px 24px;
  height: ${(props) => (props.infoOpen ? "auto" : "90px")};
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${(props) => (props.infoOpen ? "block" : "-webkit-box")};
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Divider = styled.div`
  width: calc(100% - 48px);
  height: 1px;
  background-color: rgba(186, 160, 79, 0.2);
  overflow: visible;
  margin: 10px 24px 10px 24px;
`;

const MapHider = styled.div`
  width: calc(100% - 600px);
  height: 100%;
  position: fixed;
  top: 0;
  left: 600px;
  background-color: #000;
  opacity: 0.6;
  z-index: 9;
`;

const FlexBox = styled.div`
  display: flex;
  margin: 24px;
  align-items: center;
`;
const LogoWrapper = styled.div`
  margin: 20px 50% 0px 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  width: 158px;
  height: 158px;
  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: var(--token-58c56d1c-7f62-4684-98af-05bff26e81d6, #fcfbf8);
  overflow: visible;
  border-radius: 18px;
  border: 2px solid #ffffff;
`;

const Logo = styled.div`
  width: 118px;
  height: 118px;
  overflow: visible;
  background-image: url(${(props) => (props.imgUrl ? props.imgUrl : null)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  border: 1px solid white;

  margin-left: 50%;
  margin-top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const LogoPlacer = styled.div`
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  box-shadow: 0px 6px 8px -1px rgba(186, 160, 79, 0.2),
    0px -2px 5px 2px rgba(255, 255, 255, 0.2);
  background-color: #faf8f3;
  overflow: visible;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  position: relative;
`;

const Icon = styled.div`
  margin: 5px;
`;

const Title = styled.span`
  width: auto; /* 167px */
  height: auto; /* 28px */
  overflow: visible;
  font-weight: 700;
  font-style: normal;
  font-family: "Nunito", serif;
  color: #000000;
  font-size: 20px;
  letter-spacing: 0px;
  line-height: 1.4;

  margin-left: 12px;
  text-align: left;
  width: 90%;
`;

const ListWrapper = styled.div`
  position: relative;
  background-color: rgb(249, 241, 215);
  padding-bottom: 200px;
`;

// const Divider = styled.div`
//   width: 95%;
//   height: 1px;
//   background-color: rgba(186, 160, 79, 0.2);
//   overflow: visible;
// `;

const OrganizationDialog = ({
  viewport,
  projectsData,
  loadingProjects,
  dataFinalMap,
  setOpenOrganizationsPage,
}) => {
  const { t } = useTranslation();
  const [infoOpen, setInfoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  const [path, setPath] = useState("");
  const [order, setOrder] = useState(1);
  const [dropdown, setDropdown] = useState("newest");
  const [logo, setLogo] = useState(null);

  const user = useSelector((state) => state.user);

  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const organization = useSelector((state) => state.data.organization);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const loadingOrganization = useSelector(
    (state) => state.data.loadingOrganization
  );

  const handleEdit = () => {
    localStorage.setItem("createOrganizationId", organization?.organizationId);
    localStorage.setItem("createOrganizationPostEdit", true);

    dispatch(stateCreateOrganizationsFunc(true));
  };

  const mapViewport = useSelector((state) => state.data.mapViewport);

  useEffect(() => {
    setLogo(null);
    // console.log( window.location.pathname.slice(15, 35));
    if (!loadingOrganization && organization && organization.organizationId) {
      const path = `organizationsData/${organization.organizationId}/logo/logo`;
      const storage = getStorage();
      getDownloadURL(ref(storage, path)).then((logo) => {
        setLogo(logo);
      });
    }
  }, [loadingOrganization]);

  useEffect(() => {
    dispatch(handleTopicSelectorRedux("all"));
    setPath(window.location.pathname);
    console.log(organization);
  }, [openOrganization]);

  const handleClose = () => {
    dispatch(openOrganizationFunc(false));
    setOpenOrganizationsPage(true);
    dispatch(clearErrors());
  };

  const handleClick = (order) => {
    setOrder(order);

    if (order === 2) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    dispatch(clearErrors());
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const dataRar = organization?.projectRooms;

  const [searchTerm, setSearchTerm] = useState("");
  const screamsSearched = dataRar?.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtteil?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtbezirk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.locationHeader?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
  });

  const sortedScreams =
    dropdown === "newest"
      ? _.orderBy(screamsSearched, "createdAt", "desc")
      : _.orderBy(screamsSearched, "likeCount", "desc");

  const dataFinal = sortedScreams;
  // .filter(
  //   ({ Thema, status, lat, long }) =>
  //     selectedTopics.includes(Thema) &&
  //     lat <= mapBounds?.latitude1 &&
  //     lat >= mapBounds?.latitude2 &&
  //     long >= mapBounds?.longitude2 &&
  //     long <= mapBounds?.longitude3 &&
  //     status === "None"
  // );

  return !loadingOrganization ? (
    <Wrapper>
      {ReactDOM.createPortal(
        <React.Fragment>
          {contactOpen && (
            <MainModal handleButtonClick={() => setContactOpen(false)}>
              <StyledH2
                fontWeight="900"
                margin="15px 0px 0px 0px"
                textAlign="center"
              >
                Kontakt
              </StyledH2>
              <br />
              {organization?.contact && (
                <React.Fragment>
                  <Divider />

                  <StyledA
                    margin="0px 24px 15px 24px"
                    onClick={() => openMail(organization?.contact)}
                  >
                    {organization?.contact}
                  </StyledA>
                </React.Fragment>
              )}
              {organization?.weblink && (
                <React.Fragment>
                  <Divider />
                  <StyledA
                    margin="0px 24px 15px 24px"
                    onClick={() => openLink(organization?.weblink)}
                  >
                    {organization?.weblink}
                  </StyledA>
                </React.Fragment>
              )}

              {organization?.address && (
                <React.Fragment>
                  <Divider />
                  <StyledA margin="0px 24px 15px 24px">
                    {organization?.address}
                  </StyledA>
                </React.Fragment>
              )}
            </MainModal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      {ReactDOM.createPortal(
        <React.Fragment>
          {faqOpen && (
            <MainModal handleButtonClick={() => setFaqOpen(false)}>
              <StyledH2
                fontWeight="900"
                margin="15px 0px 0px 0px"
                textAlign="center"
              >
                FAQ
              </StyledH2>
              <br />
              <Divider />

              <Accordion data={organization?.faqs} />
            </MainModal>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )}

      <CustomIconButton
        name="Close"
        position="fixed"
        margin="10px"
        backgroundColor="#FFF0BC"
        handleButtonClick={() => handleClose()}
        zIndex={99}
      />

      {organization?.userIds.includes(user.userId) && (
        <CustomIconButton
          name="Menu"
          iconWidth="25px"
          handleButtonClick={() => handleEdit()}
          position="absolute"
          left="calc(100% - 60px)"
          top="10px"
          backgroundColor="#FFF0BC"
          zIndex="99"
        />
      )}
      <SVGWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="466"
          style={{
            position: "absolute",
            zIndex: -1,
            marginTop: "40px",
            transform: "scale(1.2)",
          }}
        >
          <path
            d="M0.5 106.5V0.5L375.5 0V38.5C361 35.5 333 41 316 61C290.075 91.5 237.5 111.5 143 91.5C67.4 75.5 16 94.6667 0.5 106.5Z"
            fill="#FED957"
          />
        </svg>
      </SVGWrapper>
      <LogoWrapper>
        <Logo imgUrl={logo} />
      </LogoWrapper>

      {organization?.status === "deactivated" ? (
        <StyledH3 margin="24px" color="#ca3336">
          {t("organization_is_deactivated")}
        </StyledH3>
      ) : (
        organization?.status === "uncompleted" && (
          <StyledH3 margin="24px" color="#ca3336">
            {t("organization_is_uncompleted")}
          </StyledH3>
        )
      )}
      <FlexBox>
        <LogoPlacer>
          <Icon>
            {setIconByOrganizationType(organization.organizationType)}
          </Icon>
        </LogoPlacer>
        <Title> {organization.title}</Title>
      </FlexBox>

      <FlexBox>
        {(organization.contact ||
          organization.weblink ||
          organization.address) && (
          <NewButton handleButtonClick={() => setContactOpen(true)}>
            {t("contact")}
          </NewButton>
        )}
        {/* <NewButton
          margin="0px 10px 0px 10px"
          handleButtonClick={() => setCalendarOpen(true)}
        >
          Kalender
        </NewButton> */}
        {organization.faqs && (
          <NewButton
            margin="0px 0px 0px 10px"
            handleButtonClick={() => setFaqOpen(true)}
          >
            FAQ
          </NewButton>
        )}
      </FlexBox>

      <InfoWidget onClick={() => setInfoOpen(!infoOpen)} infoOpen={infoOpen}>
        <StyledH2 fontWeight="700">
          Informationen{" "}
          <img
            src={Arrow}
            width="13px"
            style={{
              position: "absolute",
              marginTop: "7px",
              marginLeft: "4px",
              pointerEvents: "none",
              transform: infoOpen ? "rotate(-90deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          ></img>
        </StyledH2>
        <StyledText>{organization?.description}</StyledText>
      </InfoWidget>

      <Divider />

      <ListWrapper>
        <Tabs
          loading={false}
          order={order}
          tabLabels={
            organization.googleCalendarId
              ? OrganizationTabData.map((item) => item.text)
              : OrganizationTabData.map((item) => item.text).slice(0, 1)
          }
          marginTop={"20px"}
          marginBottom={"20px"}
          handleClick={setOrder}
          type="secondary"
          secondaryColor="rgba(186, 160, 79, 0.8)"
        />

        {order === 1 ? (
          <List
            swipeListType="projectRoomOverview"
            loading={loading}
            dropdown={dropdown}
            dataFinal={dataFinal}
            projectsData={projectsData}
          />
        ) : (
          <CalendarComponent
            googleCalendarId={organization?.googleCalendarId}
          />
        )}
      </ListWrapper>
      {/* {ReactDOM.createPortal(
        <React.Fragment>
          {!isMobileCustom && calendarOpen && (
            <CalendarWrapper>
              <CalendarComponent
                googleCalendarId={organization?.googleCalendarId}
              />
            </CalendarWrapper>
          )}
        </React.Fragment>,
        document.getElementById("portal-root-modal")
      )} */}
    </Wrapper>
  ) : (
    <Loader left="calc(100vw - 400px)" width="400px" />
  );
};

export default OrganizationDialog;
