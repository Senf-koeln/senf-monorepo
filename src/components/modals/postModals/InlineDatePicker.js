/** @format */
import React, { useState, Component, Fragment } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

// REDUX Stuff
import { connect } from "react-redux";

import CalendarIcon from "../../../images/icons/calendar.png";
import { TextField } from "@material-ui/core";

const styles = {
  paper: {
    borderRadius: "20px",

    // width: "95%",
    margin: "2.5%",
    maxWidth: "400px",
    width: "95%",
  },
  confirmButton: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70%",
    clear: "both",
    color: "red",
  },
  line: {
    height: 1,
    width: "100%",

    backgroundColor: "grey",
  },
  button: {
    fontSize: 20,

    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70px",
  },
};

class InlineDatePicker extends Component {
  render() {
    const {
      classes,
      weblink,
      weblinkTitle,
      handleChange,

      openCalendar,
      handleOpenCalendar,
      handleCloseCalendar,
      handleSaveCalendar,
      selectedDays,
    } = this.props;

    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
      <Fragment>
        <div
          onClick={handleOpenCalendar}
          className="buttonRound buttonCalendar"
          style={
            selectedDays && selectedDays.length > 0
              ? { backgroundColor: "#fed957" }
              : {}
          }
        >
          <img src={CalendarIcon} width="30" alt="AddIcon" />
        </div>
        <Dialog
          open={openCalendar}
          onClose={handleCloseCalendar}
          width="md"
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
        >
          <h3 className="modal_title">Datum hinzufügen:</h3>

          <p style={{ widthh: "100%", textAlign: "center" }}>
            Zuerst Datum, dann Zeit auswählen.
          </p>

          <div className="textFields">
            <Calendar
              weekStartDayIndex={1}
              weekDays={["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]}
              months={[
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember",
              ]}
              value={selectedDays}
              onChange={handleChange}
              format="D. MMMM HH:mm"
              sort
              shadow={false}
              plugins={[
                <DatePanel
                  header="Ausgewählte Daten"
                  position="bottom"
                  markFocused
                />,
                <TimePicker
                  position="right"
                  hideSeconds
                  timeFormat="HH:mm"
                  showTimeInput
                  style={{ minWidth: "100px" }}
                />,
              ]}
            ></Calendar>
          </div>

          <div className="buttons">
            <Button className={classes.button} onClick={handleCloseCalendar}>
              {weblink !== "" && weblinkTitle !== "" ? "Löschen" : "Abbrechen"}
            </Button>
            <Button
              className={classes.button}
              onClick={handleSaveCalendar}
              style={
                weblink !== "" && weblinkTitle !== ""
                  ? {}
                  : { pointerEvents: "none", opacity: 0.6 }
              }
            >
              Speichern
            </Button>
          </div>
        </Dialog>
      </Fragment>
    );
  }
}

InlineDatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(InlineDatePicker));
