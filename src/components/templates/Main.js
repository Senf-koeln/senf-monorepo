/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../util/customDeviceDetect";
import _ from "lodash";

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

import { setMapViewport } from "../../redux/actions/mapActions";

//Components
import InsightsPage from "../organisms/Insights/InsightsPage";
import DesktopSidebar from "../molecules/Navigation/DesktopSidebar";
import Topbar from "../molecules/Navigation/Topbar";
import MapDesktop from "../atoms/map/MapDesktop";
import IdeaList from "../organisms/IdeaList/IdeaList";
import ProjectsPage from "../organisms/Projects/ProjectsPage";
import ScreamDialog from "../organisms/IdeaDialog/ScreamDialog";
import ProjectDialog from "../organisms/Projects/ProjectDialog";
import ThanksForTheVote from "../atoms/Backgrounds/ThanksForTheVote";
import Account from "../organisms/Account/Account";
import Loader from "../atoms/Animations/Loader";
import { closeAccountFunc } from "../../redux/actions/accountActions";

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { screamId } = useParams();
  const { cookie_settings } = useSelector((state) => state.data);

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
    if (
      cookie_settings !== "all" &&
      cookie_settings !== "minimum" &&
      isMobileCustom
    ) {
      history.push("/intro");
    } else {
      dispatch(getScreams())
        .then(() => {
          dispatch(getProjects());
        })
        .then(() => {
          if (!screamId) {
            setTimeout(() => {
              const viewport = {
                latitude: 50.93864020643174,
                longitude: 6.958725744885521,
                zoom: isMobileCustom ? 9.5 : 11.5,
                transitionDuration: 4000,
                pitch: 30,
                bearing: 0,
              };
              dispatch(setMapViewport(viewport));
            }, 2000);
          }
        });

      if (!openInfoPage && screamId) {
        openDialogFromUrl();
      }
    }
  }, []);

  const openDialogFromUrl = () => {
    if (screamId) {
      if (screamId.indexOf("_") > 0) {
        dispatch(openProjectFunc(screamId));
      } else {
        dispatch(openScreamFunc(screamId));
      }
      setScreamIdParam(screamId);
    }
    if (window.location.pathname === "/projects") {
      handleClick(2);
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

  const sortedScreams =
    dropdown === "newest"
      ? _.orderBy(screams, "createdAt", "desc")
      : _.orderBy(screams, "likeCount", "desc");

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
    <div>
      {!loading && screams.length === 0 && (
        <div className="errorBackground">
               <div className="homeHeader"> Ooops! </div>
          <br />
          <span className="oopsText">{t("something_went_wrong")}</span>
        </div>
      )}

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
        id="mapDesktop"
        openProject={openProject}
        geoData={project && openProject && project.geoData}
      ></MapDesktop>

      {!openInfoPage && (
        <div className="contentWrapper">
          {loading && <Loader />}
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
              loadingProjects={loadingProjects}
              project={project}
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
            ></ProjectDialog>
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

      {!openInfoPage && order === 2 && (
        <div className="contentWrapper_insights">
          <ProjectsPage
            loadingProjects={loadingProjects}
            order={order}
            projects={projects}
          ></ProjectsPage>
        </div>
      )}
      {!openInfoPage && order === 3 && (
        <div className="contentWrapper_insights">
          <InsightsPage order={order}></InsightsPage>
        </div>
      )}

      {!openInfoPage && openScream && <ScreamDialog />}
    </div>
  );
};

export default Main;
