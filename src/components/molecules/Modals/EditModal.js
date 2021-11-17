/** @format */

import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";

// REDUX Stuff
import { useSelector, useDispatch } from "react-redux";

import { editScreamFunc } from "../../../redux/actions/screamActions";

import Weblink from "./Post_Edit_ModalComponents/Weblink";
import Contact from "./Post_Edit_ModalComponents/Contact";
import InlineDatePicker from "./Post_Edit_ModalComponents/InlineDatePicker";

import MainModal from "./MainModal";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import EditModalMainFields from "./Post_Edit_ModalComponents/EditModalMainFields";

const styles = {
  root: {
    zIndex: 7,
  },
  paper: {
    borderRadius: "20px",
    zIndex: 7,
    // width: "95%",
    margin: "2.5%",
    maxWidth: "400px",
  },

  button: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70px",
  },

  confirmButton: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70%",
    clear: "both",
    color: "#353535",
  },
};

const EditModal = ({ setEditOpen, setMenuOpen, editOpen, classes }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [address, setAddress] = useState("Ohne Ortsangabe");
  const [neighborhood, setNeighborhood] = useState("Ohne Ortsangabe");
  const [fulladdress, setFulladdress] = useState("Ohne Ortsangabe");

  const projects = useSelector((state) => state.data.projects);
  const scream = useSelector((state) => state.data.scream);
  const [checkIfCalendar, setCheckIfCalendar] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [project, setProject] = useState("");

  const [weblinkOpen, setWeblinkOpen] = useState(false);
  const [weblink, setWeblink] = useState(null);
  const [weblinkTitle, setWeblinkTitle] = useState(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const [contactTitle, setContactTitle] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedUnix, setSelectedUnix] = useState([]);

  const [viewport, setViewport] = useState(null);

  useEffect(() => {
    setBody(scream.body);
    setTitle(scream.title);
    setTopic(scream.Thema);
    setViewport({ latitude: scream.lat, longitude: scream.long });

    setNeighborhood(scream.Stadtteil);
    setAddress(scream.locationHeader);
    setFulladdress(scream.district);

    projects.forEach((element) => {
      if (scream.project === element.project) {
        setCheckIfCalendar(element.calendar);
      }
      if (scream.project === "") {
        setCheckIfCalendar(false);
      }
    });

    if (scream.project) {
      setProject(scream.project);
    }

    if (scream.weblink) {
      setWeblink(scream.weblink);
      setWeblinkTitle(scream.weblinkTitle);
    }
    if (scream.contact) {
      setContact(scream.contact);
      setContactTitle(scream.contactTitle);
    }

    if (scream.selectedUnix) {
      const selectedDays = [];
      const selectedUnix = scream.selectedUnix;
      var i;
      for (i = 0; i < selectedUnix.length; i++) {
        selectedDays[i] = new Date(selectedUnix[i] * 1000);
      }

      setSelectedDays(selectedDays);
      setSelectedUnix(scream.selectedUnix);
    }
  }, [editOpen, scream]);

  const handleDropdown = (value) => {
    setTopic(value);
  };

  const handleDropdownProject = (value) => {
    setProject(value);

    projects.forEach((element) => {
      if (value === element.project) {
        setCheckIfCalendar(element.calendar);
      }
      if (value === "") {
        setCheckIfCalendar(false);
      }
    });
  };

  const handleCloseWeblink = () => {
    setWeblinkOpen(false);
    setWeblink(null);
    setWeblinkTitle(null);
  };
  const handleSaveWeblink = () => {
    setWeblinkOpen(false);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
    setContact(null);
    setContactTitle(null);
  };
  const handleSaveContact = () => {
    setContactOpen(false);
  };

  const handleChangeCalendar = (selectedDays) => {
    const selectedUnix = [];
    var i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i]["unix"];
    }

    setSelectedDays(selectedDays);
    setSelectedUnix(selectedUnix);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);

    setSelectedDays([]);
    setSelectedUnix([]);
  };
  const handleSaveCalendar = () => {
    setCalendarOpen(false);
  };

  const onSelected = (newViewport) => {
    setTimeout(() => {
      geocode(newViewport);
      setViewport(newViewport);
    }, 1000);
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(address, neighborhood);
    const editScream = {
      screamId: scream.screamId,
      body,
      title,
      locationHeader: address,
      district: fulladdress,
      Stadtteil: neighborhood,
      lat: viewport.latitude,
      long: viewport.longitude,
      project,
      Thema: topic,
      weblinkTitle,
      weblink,
      contactTitle,
      contact,
    };

    if (selectedUnix[0] === undefined) {
      editScream.selectedUnix = null;
    } else {
      editScream.selectedUnix = selectedUnix;
    }

    dispatch(editScreamFunc(editScream, history)).then(() => {
      setEditOpen(false);
      setMenuOpen(false);
    });
  };

  return (
    <React.Fragment>
      {weblinkOpen && (
        <Weblink
          handleCloseWeblink={handleCloseWeblink}
          handleSaveWeblink={handleSaveWeblink}
          weblinkTitle={weblinkTitle}
          weblink={weblink}
          setWeblinkTitle={setWeblinkTitle}
          setWeblink={setWeblink}
          setWeblinkOpen={setWeblinkOpen}
        />
      )}
      {contactOpen && (
        <Contact
          handleCloseContact={handleCloseContact}
          handleSaveContact={handleSaveContact}
          contactTitle={contactTitle}
          contact={contact}
          setContactTitle={setContactTitle}
          setContact={setContact}
          setContactOpen={setContactOpen}
        />
      )}
      {calendarOpen && (
        <InlineDatePicker
          setCalendarOpen={setCalendarOpen}
          handleCloseCalendar={handleCloseCalendar}
          handleSaveCalendar={handleSaveCalendar}
          handleChangeCalendar={handleChangeCalendar}
          selectedDays={selectedDays}
        />
      )}

      <MainModal handleButtonClick={() => setEditOpen(false)}>
        <h3 className="modal_title">Idee bearbeiten</h3>
        <EditModalMainFields
          project={project}
          handleDropdownProject={handleDropdownProject}
          onSelected={onSelected}
          viewport={viewport}
          scream={scream}
          title={title}
          body={body}
          topic={topic}
          setTitle={setTitle}
          setBody={setBody}
          handleDropdown={handleDropdown}
          weblink={weblink}
          weblinkTitle={weblinkTitle}
          setWeblinkOpen={setWeblinkOpen}
          contact={contact}
          contactTitle={contactTitle}
          setContactOpen={setContactOpen}
          checkIfCalendar={checkIfCalendar}
          selectedDays={selectedDays}
          setCalendarOpen={setCalendarOpen}
        />
        <div className="buttons">
          <Button className={classes.button} onClick={() => setEditOpen(false)}>
            Abbrechen
          </Button>
          <Button
            className={classes.button}
            onClick={handleSubmit}
            style={
              title === "" || body === ""
                ? { pointerEvents: "none", opacity: 0.4 }
                : {}
            }
          >
            Speichern
          </Button>
        </div>
      </MainModal>
    </React.Fragment>
  );
};

export default withStyles(styles)(EditModal);
