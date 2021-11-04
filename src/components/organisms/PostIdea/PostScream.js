/** @format */

import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useTranslation } from "react-i18next";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";

//HANDLER
import RegistrationAndLogin from "../../atoms/Auth/LoginRegistration";

//ICONS
import AddIcon from "../../../images/icons/plus_white.png";

// REDUX STUFF
import { useDispatch, useSelector } from "react-redux";
import { postScream } from "../../../redux/actions/screamActions";
import { clearErrors } from "../../../redux/actions/errorsActions";

import { withRouter } from "react-router-dom";

//Components
import PostScreamFormContent from "./PostScreamFormContent";
import PostScreamMap from "./PostScreamMap";
import PostScreamSelectContainter from "./PostScreamSelectContainter";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import styled, { keyframes } from "styled-components";
import { setMapViewport } from "../../../redux/actions/mapActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddbuttonAnimation = keyframes`
     0% {
    background-color: #ffd862;
  }

  50% {
    background-color: #414345;
  }

  100% {
    background-color: #ffd862;
  }
    `;

const enterAnimation = keyframes`
0% {
transform: translateY(400%) translateX(-50%);
}
50% {
transform: translateY(400%) translateX(-50%);
}


100% {
  transform: translateY(0%) translateX(-50%);}
`;

const OpenButtonMobile = styled.button`
  z-index: 99;
  width: 40px;
  height: 40px;
  padding: 22px;
  position: fixed;
  left: 50vw;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(87, 87, 87);
  border: 1px white solid;
  border-radius: 100%;
  font-size: 0;
  box-shadow: rgb(0, 0, 0, 0.8) 0px 20px 20px -15px;
  z-index: ${(props) => (props.openScream ? 0 : 999)};

  animation: ${AddbuttonAnimation} 5s ease-in-out infinite,
    ${enterAnimation} 3.5s;

  bottom: ${(props) => (props.swipePosition === "bottom" ? "135px" : "9px")};
  left: 50vw;
  transition: 1s;
`;

const OpenButtonDesktop = styled.button`
  z-index: 9999;
  width: 160px;
  height: 40px;
  padding: 0;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  left: 20px;
  transform: none;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  background-color: #353535;

  border: 0px white solid;
  border-radius: 40px;
  top: 85px;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 12pt;
  color: white;
  font-family: Futura PT W01 Book;
  animation: none;

  box-shadow: rgb(0, 0, 0, 0) 0px 20px 20px -15px;
  transition: 0.5s;
`;

const styles = {
  root: {
    padding: "0",
    overflow: "hidden",
    backgroundColor: isMobileCustom ? "white" : "rgb(0,0,0,0.8)",
    backdropFilter: "blur(5px)",
  },

  paper: {
    boxShadow: "none",
    padding: "0",
    top: "0",
    overflow: "hidden",
    borderRadius: "0px",
    backgroundColor: "transparent",
  },

  progress: {
    position: "absolute",
    left: "50%",
    marginLeft: "-15px",
    bottom: "10px",
    zIndex: "9999",
  },

  content: {
    padding: 25,
    objectFit: "cover",
    overflow: "scroll",
    width: "100%",
  },

  textField: {
    marginTop: "0px",
    width: "100%",
  },

  locationOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "1%",
  },

  Authlink: {
    position: "fixed",
    top: "25vh",
    height: "80vh",
    zIndex: "99999",
    width: "100%",
  },

  AuthlinkDesktop: {
    zIndex: 992,
    position: "fixed",
    top: "40px",

    left: 0,
    marginLeft: "210px",
    marginRight: "auto",
    height: "600px",
    width: "380px",
    borderRadius: "20px",
    boxShadow: "0 0px 40px -12px rgba(0,0,0,0)",
  },
};

const PostScream = ({
  classes,
  loadingProjects,
  projectsData,
  swipePosition,
}) => {
  const dispatch = useDispatch();
  const { loading, openScream } = useSelector((state) => state.UI);
  const { project } = useSelector((state) => state.data);

  const user = useSelector((state) => state.user);
  const { authenticated } = user;
  const history = useHistory();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const mapViewport = useSelector((state) => state.data.mapViewport);

  const [viewport, setViewport] = useState({
    latitude: 50.93864020643174,
    longitude: 6.958725744885521,
    zoom: 12,
    transitionDuration: 1000,
    pitch: 0,
  });

  const [addressBarClickedState, setAddressBarClickedState] = useState(false);

  const [out, setOut] = useState(false);
  const [projectSelected, setProjectSeleted] = useState("");
  const [geoData, setGeoData] = useState("");
  const [checkIfCalendar, setCheckIfCalendar] = useState(false);

  const [address, setAddress] = useState("Ohne Ortsangabe");
  const [neighborhood, setNeighborhood] = useState("Ohne Ortsangabe");
  const [fulladdress, setFulladdress] = useState("Ohne Ortsangabe");

  const [allMainStates, setAllMainStates] = useState({
    errors: {},
    MapHeight: "100vh",
    locationDecided: false,
  });

  const { errors, MapHeight, locationDecided } = allMainStates;

  const [allValues, setAllValues] = useState({
    body: "",
    title: "",
    topic: "",
    openWeblink: false,
    weblinkTitle: null,
    weblink: null,
    openContact: false,
    contactTitle: null,
    contact: null,
    openCalendar: false,
    selectedDays: [],
    selectedUnix: [],
  });

  const {
    body,
    title,
    topic,
    openWeblink,
    weblinkTitle,
    weblink,
    openContact,
    contactTitle,
    contact,
    openCalendar,
    selectedDays,
    selectedUnix,
  } = allValues;

  // useEffect(() => {
  //   console.log("nextprops error");
  //   // componentWillReceiveProps(nextProps) {
  //   //   if (nextProps.UI.errors) {
  //   //     this.setState({
  //   //       errors: nextProps.UI.errors,
  //   //     });
  //   //   }
  //   //   if (!nextProps.UI.errors && !nextProps.UI.loading) {
  //   //     this.setState({ body: "", open: false, errors: {} });
  //   //     this.setState({ title: "", open: false, errors: {} });
  //   //   }
  //   // }
  // }, [nextProps.UI.errors]);

  const handleOpen = (event) => {
    event.preventDefault();
    const projectSelected = project ? project.id : "";

    setOpen(true);
    setProjectSeleted(projectSelected);

    // setAllMainStates({ ...allMainStates, loading: false });

    projectsData.forEach((element) => {
      if (projectSelected === element.project) {
        const viewport = {
          zoom: element.zoom,
          latitude: element.centerLat,
          longitude: element.centerLong,
          transitionDuration: 1000,
        };
        setViewport(viewport);

        setGeoData(element.geoData);
        setCheckIfCalendar(element.calendar);
      }
      if (projectSelected === "") {
        const viewport = {
          zoom: mapViewport.zoom,
          latitude: mapViewport.latitude,
          longitude: mapViewport.longitude,
          transitionDuration: 1000,
        };
        setViewport(viewport);

        setGeoData("");
      }
    });
  };

  const handleClose = () => {
    dispatch(clearErrors());
    setOpen(false);
    setAllMainStates({ ...allMainStates, errors: {} });
  };

  const handleDropdown = (value) => {
    // event.preventDefault();
    setAllValues({
      ...allValues,
      topic: value,
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setAllValues({
      ...allValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeCalendar = (selectedDays) => {
    const selectedUnix = [];
    var i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i]["unix"];
    }
    setAllValues({
      ...allValues,
      selectedDays: selectedDays,
      selectedUnix: selectedUnix,
    });
  };

  const handleDropdownProject = (value) => {
    // event.preventDefault();
    setProjectSeleted(value);

    projectsData.forEach((element) => {
      if (value === element.project) {
        const viewport = {
          zoom: element.zoom,
          latitude: element.centerLat,
          longitude: element.centerLong,
          transitionDuration: 1000,
        };
        setViewport(viewport);

        setGeoData(element.geoData);
        setCheckIfCalendar(element.calendar);
      }
      if (value === "") {
        const viewport = {
          zoom: 12,
          latitude: 50.93864020643174,
          longitude: 6.958725744885521,
          transitionDuration: 1000,
        };
        setViewport(viewport);

        setGeoData("");
        setCheckIfCalendar(false);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newScream = {
      body,
      title,
      locationHeader: address,
      fulladdress,
      neighborhood,
      lat: viewport.latitude,
      long: viewport.longitude,
      project: projectSelected,
      Thema: topic,
      weblinkTitle,
      weblink,
      contactTitle,
      contact,
    };

    if (selectedUnix.length > 0) {
      newScream.selectedUnix = selectedUnix;
    }
    dispatch(postScream(newScream, user, history)).then(() => {
      setOpen(false);
    });
  };

  const _onMarkerDragEnd = (newViewport) => {
    setViewport(newViewport);

    setAddressBarClickedState(false);
  };

  const geocode = (viewport) => {
    const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
    const geocodingClient = mbxGeocoding({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    });
    geocodingClient
      .reverseGeocode({
        query: [viewport.longitude, viewport.latitude],
        limit: 1,
      })
      .send()
      .then((response) => {
        const match = response.body;
        console.log("Gesamt", match.features[0]);
        console.log(
          "Adresse",
          match.features[0].text,
          match.features[0].address
        );
        console.log("Stadtteil", match.features[0].context[1].text);

        const houseNumber =
          match.features[0].address !== undefined
            ? match.features[0].address
            : "";

        setNeighborhood(match.features[0].context[1].text);
        setAddress(match.features[0].text + " " + houseNumber);
        setFulladdress(match.features[0].place_name);
      });

    if (
      viewport.latitude > 51.08 ||
      viewport.latitude < 50.79 ||
      viewport.longitude < 6.712 ||
      viewport.longitude > 7.17
    ) {
      alert("Außerhalb von Köln kannst du leider noch keine Ideen teilen.");

      setOut(true);
    } else {
      setOut(false);
    }
  };

  const onSelected = (newViewport) => {
    setViewport(newViewport);

    setTimeout(() => {
      geocode(newViewport);
    }, 1000);
  };

  const addressBarClicked = () => {
    setAddressBarClickedState(true);
  };

  const handleLocationDecided = () => {
    if (locationDecided === false) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: true,
        MapHeight: "30vh",
      });
    }

    if (locationDecided === true) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: false,
        MapHeight: "100vh",
      });
    }
  };

  const handleLocationDecidedNoLocation = () => {
    if (locationDecided === false) {
      setNeighborhood("Ohne Ortsangabe");
      setAddress("Ohne Ortsangabe");
      setFulladdress("Ohne Ortsangabe");
      const viewport = {
        zoom: 12,
        latitude: 50.93864020643174,
        longitude: 6.958725744885521,
        transitionDuration: 1000,
      };
      setViewport(viewport);

      setAllMainStates({
        ...allMainStates,
        locationDecided: true,
        MapHeight: "30vh",
      });
    }

    if (locationDecided === true) {
      setAllMainStates({
        ...allMainStates,
        locationDecided: false,
        MapHeight: "100vh",
      });
    }
  };

  const handleOpenWeblink = () => {
    setAllValues({ ...allValues, openWeblink: true });
  };
  const handleCloseWeblink = () => {
    setAllValues({
      ...allValues,
      openWeblink: false,
      weblink: null,
      weblinkTitle: null,
    });
  };
  const handleSaveWeblink = () => {
    setAllValues({ ...allValues, openWeblink: false });
  };
  const handleOpenContact = () => {
    setAllValues({ ...allValues, openContact: true });
  };
  const handleCloseContact = () => {
    setAllValues({
      ...allValues,
      openContact: false,
      contact: null,
      contactTitle: null,
    });
  };
  const handleSaveContact = () => {
    setAllValues({ ...allValues, openContact: false });
  };

  const handleOpenCalendar = () => {
    setAllValues({ ...allValues, openCalendar: true });
  };
  const handleCloseCalendar = () => {
    setAllValues({
      ...allValues,
      openCalendar: false,
      selectedDays: [],
      selectedUnix: [],
    });
  };
  const handleSaveCalendar = () => {
    setAllValues({ ...allValues, openCalendar: false });
  };

  return (
    <Fragment>
      {!isMobileCustom ? (
        <OpenButtonDesktop onClick={handleOpen}>
          <img src={AddIcon} width="25" alt="AddIcon" />
          <span className="addText">{t("postScream_newIdea")}</span>
        </OpenButtonDesktop>
      ) : (
        !loading &&
        !loading && (
          <OpenButtonMobile
            onClick={handleOpen}
            swipePosition={swipePosition}
            openScream={openScream}
          >
            <img src={AddIcon} width="25" alt="AddIcon" />
          </OpenButtonMobile>
        )
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullScreen
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
      >
        {!authenticated && (
          <div
            className={
              isMobileCustom ? classes.Authlink : classes.AuthlinkDesktop
            }
            style={
              isMobileCustom && locationDecided
                ? { top: "27vh", transition: "0.5s" }
                : isMobileCustom && !locationDecided
                ? { top: "100vh", transition: "0.5s" }
                : null
            }
          >
            <RegistrationAndLogin />
          </div>
        )}

        {isMobileCustom && (
          <div
            style={
              locationDecided
                ? { marginTop: 0, transition: "0.5s" }
                : { marginTop: "100vh", transition: "0.5s" }
            }
          >
            <div
              className="backContainer"
              onClick={() => handleLocationDecided()}
            ></div>

            <div className="PostBackground"></div>
          </div>
        )}

        <PostScreamMap
          MapHeight={MapHeight}
          geocode={geocode}
          _onMarkerDragEnd={_onMarkerDragEnd}
          geoData={geoData}
          viewport={viewport}
          clicked={addressBarClickedState}
          addressBarClicked={addressBarClicked}
          locationDecided={locationDecided}
          onSelected={onSelected}
          address={address}
          loadingProjects={loadingProjects}
        />

        <PostScreamSelectContainter
          classes={classes}
          locationDecided={locationDecided}
          handleLocationDecided={handleLocationDecided}
          handleLocationDecidedNoLocation={handleLocationDecidedNoLocation}
          projectSelected={projectSelected}
          address={address}
          handleDropdownProject={handleDropdownProject}
          open={open}
          loadingProjects={loadingProjects}
          projectsData={projectsData}
        />

        <PostScreamFormContent
          classes={classes}
          errors={errors}
          address={address}
          handleLocationDecided={handleLocationDecided}
          handleChange={handleChange}
          handleDropdown={handleDropdown}
          openWeblink={openWeblink}
          weblink={weblink}
          weblinkTitle={weblinkTitle}
          handleOpenWeblink={handleOpenWeblink}
          handleCloseWeblink={handleCloseWeblink}
          handleSaveWeblink={handleSaveWeblink}
          openContact={openContact}
          contactTitle={contactTitle}
          contact={contact}
          handleOpenContact={handleOpenContact}
          handleCloseContact={handleCloseContact}
          handleSaveContact={handleSaveContact}
          project={projectSelected}
          openCalendar={openCalendar}
          selectedDays={selectedDays}
          handleOpenCalendar={handleOpenCalendar}
          handleCloseCalendar={handleCloseCalendar}
          handleSaveCalendar={handleSaveCalendar}
          handleChangeCalendar={handleChangeCalendar}
          topic={topic}
          loading={loading}
          Out={out}
          locationDecided={locationDecided}
          handleSubmit={handleSubmit}
          body={body}
          title={title}
          checkIfCalendar={checkIfCalendar}
        />
        <CustomIconButton
          name="Close"
          position="fixed"
          margin={
            document.body.clientWidth > 768 ? "40px" : "18px 0px 0px 13px"
          }
          handleButtonClick={handleClose}
          zIndex="1"
        />
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(withRouter(PostScream));
