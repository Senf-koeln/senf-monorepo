/** @format */

import React, { useState, useEffect } from "react";
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
  openProjectFunc,
  closeProject,
} from "../../redux/actions/projectActions";

import { setMapBounds, setMapViewport } from "../../redux/actions/mapActions";

//Components


import Topbar from "../molecules/Navigation/Topbar";

import ThanksForTheVote from "../atoms/Backgrounds/ThanksForTheVote";
import Account from "../organisms/Account/Account";
import Loader from "../atoms/Animations/Loader";
import lazyLoader from "../atoms/Animations/LazyLoader";
import { closeAccountFunc } from "../../redux/actions/accountActions";
import ErrorBackground from "../atoms/Backgrounds/ErrorBackground";
import { isAndroid } from "react-device-detect";
import TopicFilter from "../atoms/Filters/TopicFilter";

const ProjectsPage =React.lazy(()=>import( "../organisms/Projects/ProjectsPage"));
const MapMobile =React.lazy(()=>import( "../atoms/map/MapMobile"));
const MapDesktop =React.lazy(()=>import( "../atoms/map/MapDesktop"));
const PostScream =React.lazy(()=>import( "../organisms/PostIdea/PostScream"));
const InsightsPage =React.lazy(()=>import( "../organisms/Insights/InsightsPage"));
const DesktopSidebar =React.lazy(()=>import( "../molecules/Navigation/DesktopSidebar"));
const IdeaList =React.lazy(()=>import( "../organisms/IdeaList/IdeaList"));
const ScreamDialog =React.lazy(()=>import( "../organisms/IdeaDialog/ScreamDialog"));
const ProjectDialog =React.lazy(()=>import( "../organisms/Projects/ProjectDialog"));
const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { screamId } = useParams();
  const { cookie_settings } = useSelector((state) => state.data);

  const [zoomBreak, setZoomBreak] = useState(0.6);

  const history = useHistory();
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);
  const openProject = useSelector((state) => state.UI.openProject);
  const openAccount = useSelector((state) => state.UI.openAccount);

  const voted = useSelector((state) => state.UI.voted);

  const screams = useSelector((state) => state.data.screams);
  const myScreams = useSelector((state) => state.data.myScreams);

  const loading = useSelector((state) => state.data.loading);
  const loadingProjects = useSelector((state) => state.UI.loadingProjects);

  const projects = useSelector((state) => state.data.projects);
  const project = useSelector((state) => state.data.project);
  const mapBounds = useSelector((state) => state.data.mapBounds);

  const mapViewport = useSelector((state) => state.data.mapViewport);

  const [topicsSelected, setTopicsSelected] = useState([
    "Verkehr",
    "Versorgung",
    "Umwelt und Grün",
    "Rad",
    "Inklusion / Soziales",
    "Sport / Freizeit",
    "Sonstige",
  ]);
  const [order, setOrder] = useState(1);
  const [screamIdParam, setScreamIdParam] = useState(null);

  const [dropdown, setDropdown] = useState("newest");

  useEffect(() => {
    if (navigator.userAgent.includes("Instagram") && isAndroid) {
      alert(
        "Bitte schau dir Senf.koeln in deinem Standardbrowser an, falls dir die Seite beschädigt angezeigt wird"
      );
    }
    if (
      cookie_settings !== "all" &&
      cookie_settings !== "minimum" &&
      isMobileCustom &&
      !screamId
    ) {
      history.push("/intro");
    } else {
      dispatch(getScreams()).then(() => {
        dispatch(getProjects());
        if (window.location.pathname === "/projects") {
          handleClick(2);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!openInfoPage && screamId) {
      openDialogFromUrl();
    }
  }, [openInfoPage]);

  const openDialogFromUrl = () => {
    if (screamId) {
      if (screamId.indexOf("_") > 0) {
        dispatch(openProjectFunc(screamId));
      } else {
        dispatch(openScreamFunc(screamId));
      }
      setScreamIdParam(screamId);
    }
  };

  const handleClick = (order) => {
    setOrder(order);

    setScreamIdParam(null);

    dispatch(closeScream());
    dispatch(closeProject());
    dispatch(closeAccountFunc());

    handleTopicSelector("all");

    if (order === 2) {
      window.history.pushState(null, null, "/projects");
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    if (order === 3) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const handleTopicSelector = (topic) => {
    const index = topicsSelected.indexOf(topic);
    if (topic === "all") {
      setTopicsSelected([
        "Verkehr",
        "Versorgung",
        "Umwelt und Grün",
        "Rad",
        "Inklusion / Soziales",
        "Sport / Freizeit",
        "Sonstige",
      ]);
    } else if (topicsSelected.length === 7) {
      setTopicsSelected([topic]);
    } else if (index === -1) {
      setTopicsSelected(topicsSelected.concat(topic));
    } else {
      const newTopics = topicsSelected.filter((item) => item !== topic);

      if (newTopics.length === 0) {
        setTopicsSelected([
          "Verkehr",
          "Versorgung",
          "Umwelt und Grün",
          "Rad",
          "Inklusion / Soziales",
          "Sport / Freizeit",
          "Sonstige",
        ]);
      } else {
        setTopicsSelected(...[newTopics]);
      }
    }
  };

  useEffect(() => {
    if (openScream) {
      setTimeout(() => {
        if (mapViewport.zoom > 15) {
          setZoomBreak(2);
        } else if (mapViewport.zoom > 11.5) {
          setZoomBreak(1);
        } else {
          setZoomBreak(0.6);
        }
      }, 1000);
    }
  }, [openScream, mapViewport]);

  const _onViewportChange = (viewport) => {
    dispatch(setMapViewport(viewport));
    if (viewport.zoom > 15) {
      setZoomBreak(2);
    } else if (viewport.zoom > 11.5) {
      setZoomBreak(1);
    } else {
      setZoomBreak(0.6);
    }

    if (isMobileCustom) {
      const boundAdds = [500, 1000, 500, 1000];
      dispatch(setMapBounds(viewport, boundAdds));
    }
  };

  // const sortedScreams =
  //   dropdown === "newest"
  //     ? _.orderBy(screams, "createdAt", "desc")
  //     : _.orderBy(screams, "likeCount", "desc");

  const sortedScreams =
    dropdown === "newest"
      ? screams?.sort(function (a, b) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        })
      : screams?.sort(function (a, b) {
          if (a.likeCount > b.likeCount) {
            return -1;
          }
          return 0;
        });

  const dataFinal = sortedScreams.filter(
    ({ Thema, lat, long, status }) =>
      topicsSelected.includes(Thema) &&
      lat <= mapBounds.latitude1 &&
      lat >= mapBounds.latitude2 &&
      long >= mapBounds.longitude2 &&
      long <= mapBounds.longitude3 &&
      status === "None"
  );

  const dataFinalLength = dataFinal.length;

  const dataFinalMap = openProject
    ? project.screams.filter(
        ({ Thema, status }) =>
          topicsSelected.includes(Thema) && status === "None"
      )
    : myScreams !== null
    ? myScreams.filter(
        ({ Thema, status }) =>
          topicsSelected.includes(Thema) && status === "None"
      )
    : screams.filter(
        ({ Thema, status }) =>
          topicsSelected.includes(Thema) && status === "None"
      );

  return (
    <React.Suspense fallback={lazyLoader}>
    <React.Fragment>
      {loading && isMobileCustom && <Loader />}
      <ErrorBackground loading={loading} />

      {voted && <ThanksForTheVote />}

      <Topbar
        loading={loading}
        handleClick={handleClick}
        order={order}
        handleTopicSelector={handleTopicSelector}
        topicsSelected={topicsSelected}
        dataFinalMap={dataFinalMap}
      />
      <DesktopSidebar
        loading={loading}
        handleClick={handleClick}
        order={order}
        handleTopicSelector={handleTopicSelector}
        topicsSelected={topicsSelected}
        loadingProjects={loadingProjects}
        projectsData={projects}
        dataFinalMap={dataFinalMap}
      ></DesktopSidebar>

      <MapDesktop
        loading={loading}
        loadingProjects={loadingProjects}
        dataFinal={dataFinalMap.slice(0, 300)}
        _onViewportChange={_onViewportChange}
        zoomBreak={zoomBreak}
        id="mapDesktop"
        openProject={openProject}
        geoData={project && openProject && project.geoData}
      ></MapDesktop>

      {!loading &&
        !loadingProjects &&
        isMobileCustom &&
        (order === 1 || openProject || openScream || openAccount) && (
          <React.Fragment>
            <PostScream
              loadingProjects={loadingProjects}
              projectsData={projects}
              project={project}
            />
            <TopicFilter
              loading={loading}
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            />
            <MapMobile
              dataFinal={dataFinalMap}
              viewport={mapViewport}
              _onViewportChange={_onViewportChange}
              zoomBreak={zoomBreak}
              openProject={openProject}
              geoData={project && openProject && project.geoData}
            />
          </React.Fragment>
        )}
      {!openInfoPage && (
        <div className="contentWrapper">
          {loading && !isMobileCustom && <Loader />}
          <div className="MainBackgroundHome" />

          {!openProject && !openAccount && (
            <IdeaList
              type="allIdeas"
              loading={loading}
              order={order}
              dataFinal={dataFinal}
              dataFinalLength={dataFinalLength}
              dataFinalMap={dataFinalMap}
              viewport={mapViewport}
              handleDropdown={handleDropdown}
              projectsData={projects}
              dropdown={dropdown}
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            />
          )}

          {openProject && (
            <ProjectDialog
              loading={loading}
              openProject={openProject}
              dataFinalMap={dataFinalMap}
              screamIdParam={screamIdParam}
              handleClick={handleClick}
              loadingProjects={loadingProjects}
              projectsData={projects}
              viewport={mapViewport}
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            />
          )}
          {openAccount && (
            <Account
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
              dataFinalMap={dataFinalMap}
            />
          )}
        </div>
      )}

      {!openInfoPage && !openProject && !openAccount && order === 2 && (
        <div className="contentWrapper_insights">
          <ProjectsPage
            loadingProjects={loadingProjects}
            order={order}
            projects={projects}
          ></ProjectsPage>
        </div>
      )}
      {!openInfoPage && !openProject && !openAccount && order === 3 && (
        <div className="contentWrapper_insights">
          <InsightsPage order={order}></InsightsPage>
        </div>
      )}

      {!openInfoPage && openScream && <ScreamDialog />}
    </React.Fragment>
    </React.Suspense>
  );
};

export default Main;
