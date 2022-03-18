/** @format */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../util/customDeviceDetect";

import {
  getScreams,
  closeScream,
  openScreamFunc,
} from "../../redux/actions/screamActions";
import {
  getProjects,
  openProjectRoomFunc,
} from "../../redux/actions/projectActions";

import {
  setMapBounds,
  setInitialMapBounds,
  setMapViewport,
} from "../../redux/actions/mapActions";
import {
  handleTopicSelectorRedux,
  setSwipePositionDown,
  setSwipePositionUp,
} from "../../redux/actions/UiActions";

// Components
import InsightsPage from "../organisms/SubPages/InsightsPage";
import DesktopSidebar from "../molecules/Navigation/DesktopSidebar";
import Topbar from "../molecules/Navigation/Topbar";
import Map from "../atoms/map/Map";
import Map2 from "../atoms/map/Map2";
import SwipeList from "../organisms/SwipeLists/SwipeList";
import IdeaDialog from "../organisms/Dialogs/IdeaDialog";
import ProjectDialog from "../organisms/Dialogs/ProjectDialog";
import ThanksForTheVote from "../atoms/Backgrounds/ThanksForTheVote";
import Account from "../organisms/Dialogs/Account";
import Loader from "../atoms/Backgrounds/Loader";
import { closeAccountFunc } from "../../redux/actions/accountActions";
import ErrorBackground from "../atoms/Backgrounds/ErrorBackground";
import TagsFilter from "../molecules/Filters/TagsFilter";
import PostScream from "../organisms/PostIdea/PostScream";
import ChangeLocationModal from "../molecules/Modals/ChangeLocationModal";
import { usePrevious } from "../../hooks/usePrevious";
import {
  getOrganizations,
  openOrganizationFunc,
} from "../../redux/actions/organizationActions";
import CreateMainComponent from "../organisms/Create_Organisation_Projectrooms/CreateMainComponent";
import OrganizationDialog from "../organisms/Dialogs/OrganizationDialog";
import OrganizationsPage from "../organisms/SubPages/OrganizationsPage";
import styled from "styled-components";
import { MenuData } from "../../data/MenuData";
import {
  filterByGeodata,
  filterByTagFilter,
  pick,
  search,
  sort,
} from "../../util/helpers";

const MainColumnWrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 90;
  top: 0;
  position: fixed;
  pointer-events: none;

  @media (min-width: 768px) {
    margin-left: 200px;
    /* width: 400px; */
    height: 100vh;
    overflow-y: scroll;
    z-index: 90;
    top: 0;
    position: fixed;
    overflow-x: visible;
  }
`;
const MobileMapClickBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(0, 0, 0, 0);
  z-index: 10;
  position: fixed;
  top: 0;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 0.5s;
  pointer-events: ${(props) => (props.show ? "all" : "none")};
`;
const Main = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { screamId, projectRoomId, organizationId } = useParams();
  const { cookie_settings } = useSelector((state) => state.data);
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);
  const openAccount = useSelector((state) => state.UI.openAccount);
  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const openCreateOrganization = useSelector(
    (state) => state.UI.openCreateOrganization
  );
  const openCreateProjectRoom = useSelector(
    (state) => state.UI.openCreateProjectRoom
  );
  const [openInsightsPage, setOpenInsightsPage] = useState(false);
  const [openOrganizationsPage, setOpenOrganizationsPage] = useState(false);
  const userLikes = useSelector((state) => state.user.likes);
  const voted = useSelector((state) => state.UI.voted);
  const screams = useSelector((state) => state.data.screams);
  const myScreams = useSelector((state) => state.data.myScreams);

  const [initialLoading, setInitialLoading] = useState(true);
  const loading = useSelector((state) => state.data.loading);
  const loadingUI = useSelector((state) => state.UI.loading);
  const loadingProjects = useSelector((state) => state.data.loadingProjects);
  const loadingOrganizations = useSelector(
    (state) => state.data.loadingOrganizations
  );

  const loadingIdea = useSelector((state) => state.data.loadingIdea);
  const loadingProjectRoom = useSelector(
    (state) => state.data.loadingProjectRoom
  );
  const loadingOrganization = useSelector(
    (state) => state.data.loadingOrganization
  );

  const projects = useSelector((state) => state.data.projects);
  const project = useSelector((state) => state.data.project);

  const organizations = useSelector((state) => state.data.organizations);

  const selectedTopics = useSelector((state) => state.data.topics);
  const selectedOrganizationTypes = useSelector(
    (state) => state.data.organizationTypes
  );

  const [order, setOrder] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState("newest");

  const swipePosition = useSelector((state) => state.UI.swipePosition);
  const setSwipeDown = () => {
    dispatch(setSwipePositionDown());
  };

  const [changeLocationModalOpen, setChangeLocationModalOpen] = useState(false);
  const mapRef = useRef(null);
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const { lat, long } = useSelector((state) => state.data.scream);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );

  useLayoutEffect(() => {
    if (
      cookie_settings !== "all" &&
      cookie_settings !== "minimum" &&
      isMobileCustom &&
      !screamId
    ) {
      history.push("/intro");
    } else {
      projectRoomId && dispatch(openProjectRoomFunc(projectRoomId, true));
      screamId && dispatch(openScreamFunc(screamId));
      organizationId && dispatch(openOrganizationFunc(true, organizationId));

      setInitialLoading(false); // [valueOfPromise1, valueOfPromise2, ...]

      if (window.location.pathname === "/projectRooms") {
        setOrder(2);
      } else if (window.location.pathname === "/organizations") {
        setOrder(2);
        dispatch(setSwipePositionUp());
        setOpenOrganizationsPage(true);
      } else if (window.location.pathname === "/insights") {
        // setOrder(4);
      } else if (projectRoomId) {
        setOrder(2);
      } else if (screamId) {
        setOrder(1);
      } else if (organizationId) {
        setOrder(2);
        dispatch(setSwipePositionUp());
        setOpenOrganizationsPage(true);
      }
    }
  }, [
    initialMapViewport,
    cookie_settings,
    dispatch,
    history,
    organizationId,
    projectRoomId,
    screamId,
  ]);

  //Initial-ZOOM
  useLayoutEffect(() => {
    if (mapViewport?.latitude !== 0 && mapRef?.current && mapLoaded) {
      const map = mapRef.current.getMap();
      var canvas = map.getCanvas(),
        w = canvas.width,
        h = canvas.height,
        NW = map.unproject([0, 0]).toArray(),
        SE = map.unproject([w, h]).toArray();
      var boundsRar = [NW, SE];

      const bounds = {
        latitude1: boundsRar[0][1],
        latitude2: boundsRar[1][1],
        longitude2: boundsRar[0][0],
        longitude3: boundsRar[1][0],
      };
      dispatch(setInitialMapBounds(bounds));
      dispatch(setMapBounds(bounds));
    }
  }, [mapLoaded, initialMapViewport]);

  //PROJECTROOM-ZOOM
  useLayoutEffect(() => {
    if (
      openProjectRoom &&
      project &&
      project.centerLong !== undefined &&
      !openScream &&
      mapViewport.latitude !== 0 &&
      mapRef.current &&
      mapLoaded
    ) {
      setTimeout(() => {
        const projectViewport = {
          latitude: project.centerLat,
          longitude: project.centerLong,
          zoom: isMobileCustom ? project.zoom - 2 : project.zoom,
          duration: 2700,
          pitch: 30,
        };

        dispatch(setMapViewport(projectViewport));
      }, 500);
    }
  }, [project]);

  //IDEA-ZOOM
  const prevLat = usePrevious({ lat });
  useLayoutEffect(() => {
    if (
      openScream &&
      !loadingIdea &&
      mapViewport.latitude !== 0 &&
      mapRef.current &&
      mapLoaded
    ) {
      if (lat && prevLat && prevLat.lat !== lat) {
        setTimeout(() => {
          dispatch(
            setMapViewport({
              latitude: isMobileCustom && openScream ? lat - 0.0008 : lat,
              longitude: long,
              zoom: 16.5,
              duration: 2700,
              pitch: 30,
            })
          );
        }, 500);
      }
    }
  }, [lat, long, loadingIdea, openScream]);

  const handleClick = useCallback(
    (order) => {
      setOrder(order);
      setSearchTerm("");
      setDropdown("newest");
      setOpenInsightsPage(false);
      setOpenOrganizationsPage(false);
      dispatch(closeScream());
      dispatch(openProjectRoomFunc(null, false));
      dispatch(openOrganizationFunc(null, false));
      dispatch(closeAccountFunc());
      dispatch(handleTopicSelectorRedux("all"));
      const ListWrapper = document.getElementById("ListWrapper");

      ListWrapper?.scrollTo({
        top: 0,
        left: 0,
      });
      if (order === 1) {
        window.history.pushState(null, null, "/");
      }
      if (order === 2) {
        window.history.pushState(null, null, "/projectRooms");
      }
      if (order === 3) {
        window.history.pushState(null, null, "/organizations");
      }
      if (order === 4) {
        window.history.pushState(null, null, "/insights");
      }
    },
    [dispatch]
  );

  const handleDropdown = useCallback((value) => {
    setDropdown(value);
  }, []);
  let ideasData;
  //IDEAS
  /*   var ideasData;
  ideasData = search(screams, searchTerm, [
    "title",
    "body",
    "Stadtteil",
    "Stadtbezirk",
    "locationHeader",
  ]); */
  //ideasData = filterByTagFilter(ideasData, selectedTopics, "Thema");

  //const dataFinalIdeas = sort(ideasData, dropdown);
  const dataFinalIdeas = useMemo(
    () => sort(screams, dropdown),
    [screams, dropdown]
  );
  //const dataFinalIdeas = filterByGeodata(ideasData, mapBounds);

  //PROJECTROOMS

  const dataFinalProjectRooms = useMemo(
    () => sort(projects, dropdown),
    [projects, dropdown]
  );

  //ORGANIZATIONS
  var organizationsData;
  organizationsData = search(organizations, searchTerm, ["title"]);
  organizationsData = sort(organizationsData, dropdown);
  const dataFinalOrganizations = filterByTagFilter(
    organizationsData,
    selectedOrganizationTypes,
    "organizationType"
  );

  //MAP

  const dataFinalMap = useMemo(
    () =>
      openProjectRoom
        ? project?.screams?.filter(({ Thema }) =>
            selectedTopics.includes(Thema)
          )
        : myScreams !== null
        ? myScreams.filter(({ Thema }) => selectedTopics.includes(Thema))
        : ideasData,
    [myScreams, openProjectRoom, project?.screams, ideasData, selectedTopics]
  );

  const dataFinalMapProjects = useMemo(
    () =>
      projects?.map((object) =>
        pick(
          [
            "title",
            "centerLat",
            "centerLong",
            "projectRoomId",
            "organizationType",
          ],
          object
        )
      ),
    [projects]
  );

  const tabLabels = useMemo(
    () => MenuData.map((item) => item.text).slice(0, 2),
    []
  );
  return (
    <React.Fragment>
      {isMobileCustom ? (
        <React.Fragment>
          {(initialLoading || loadingIdea || loadingProjectRoom) && (
            <Loader withoutBg={true} />
          )}
          {isMobileCustom && !openScream && (
            <MobileMapClickBackground
              show={swipePosition === "top"}
              onClick={setSwipeDown}
            />
          )}
          {!loading &&
            !loadingUI &&
            !loadingProjects &&
            !openScream &&
            (order === 1 || order === 2 || openProjectRoom || openAccount) && (
              <TagsFilter
                loading={loading}
                type={
                  order === 1 || openProjectRoom || openAccount
                    ? "topics"
                    : "organizationType"
                }
              />
            )}
          <Topbar loading={loading} handleClick={handleClick} order={order} />
        </React.Fragment>
      ) : (
        <DesktopSidebar
          handleClick={handleClick}
          order={order}
          setChangeLocationModalOpen={setChangeLocationModalOpen}
          loading={initialLoading}
        />
      )}

      {/*  <Map
        order={order}
        dataFinal={dataFinalMap}
        loading={loading}
        loadingProjects={loadingProjects}
        openProjectRoom={openProjectRoom}
        geoData={project && openProjectRoom && project.geoData}
        mapRef={mapRef}
        projects={dataFinalMapProjects}
      /> */}
      <Map2 />

      {!openInfoPage && (
        <MainColumnWrapper>
          {(initialLoading || loadingIdea || loadingProjectRoom) &&
            !isMobileCustom && <Loader left="200px" width="400px" />}

          {!openProjectRoom &&
            !openAccount &&
            !initialLoading &&
            (order === 1 || (order === 2 && !loadingProjects)) && (
              <SwipeList
                swipeListType={order === 1 ? "ideas" : "projectRoomOverview"}
                tabLabels={tabLabels}
                loading={initialLoading}
                order={order}
                dataFinal={order === 1 ? dataFinalIdeas : dataFinalProjectRooms}
                dataFinalMap={dataFinalMap}
                handleDropdown={handleDropdown}
                dataFinalProjectRooms={dataFinalProjectRooms}
                dropdown={dropdown}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                handleClick={handleClick}
                setOpenInsightsPage={setOpenInsightsPage}
                setOpenOrganizationsPage={setOpenOrganizationsPage}
                openOrganizationsPage={openOrganizationsPage}
                openInsightsPage={openInsightsPage}
                setOpenInsightsPage={setOpenInsightsPage}
              />
            )}

          {openProjectRoom && (
            <ProjectDialog
              loading={loading}
              handleClick={handleClick}
              loadingProjects={loadingProjects}
              dataFinalProjectRooms={dataFinalProjectRooms}
              setOpenInsightsPage={setOpenInsightsPage}
            />
          )}

          {openAccount && <Account dataFinalMap={dataFinalMap} />}

          {!openInfoPage && openScream && <IdeaDialog />}
        </MainColumnWrapper>
      )}

      {openOrganization && !loadingOrganization && (
        <OrganizationDialog
          openOrganization={openOrganization}
          dataFinalMap={dataFinalMap}
          handleClick={handleClick}
          loadingProjects={false}
          loading={loadingOrganizations}
          projectsData={dataFinalProjectRooms}
          setOpenOrganizationsPage={setOpenOrganizationsPage}
        />
      )}

      {!openInfoPage &&
        !openProjectRoom &&
        !openAccount &&
        openOrganizationsPage &&
        !loadingOrganizations && (
          <OrganizationsPage
            order={order}
            setOpenOrganizationsPage={setOpenOrganizationsPage}
            dataFinal={dataFinalOrganizations}
            dropdown={dropdown}
            handleDropdown={handleDropdown}
            setDropdown={setDropdown}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            dataFinalProjectRooms={dataFinalProjectRooms}
          />
        )}

      {!openInfoPage &&
        !openAccount &&
        !openOrganization &&
        openInsightsPage && (
          <InsightsPage
            setOpenInsightsPage={setOpenInsightsPage}
            projectRoomId={project?.projectRoomId}
          />
        )}

      <ErrorBackground loading={loading} />

      {voted && userLikes.length <= 1 && <ThanksForTheVote />}
      {changeLocationModalOpen && (
        <ChangeLocationModal
          setChangeLocationModalOpen={setChangeLocationModalOpen}
        />
      )}

      {(openCreateProjectRoom || openCreateOrganization) && (
        <CreateMainComponent
          type={
            openCreateProjectRoom
              ? "projectRoom"
              : openCreateOrganization && "organization"
          }
        />
      )}
    </React.Fragment>
  );
};

export default Main;
