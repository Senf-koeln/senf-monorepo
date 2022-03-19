/** @format */

import React, { useState, useEffect } from "react";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import styled from "styled-components";
import Cookies from "universal-cookie";
import deLocale from "@fullcalendar/core/locales/de";
import enLocale from "@fullcalendar/core/locales/en-gb";
import { formatDate } from "@fullcalendar/react";

import listMonth from "@fullcalendar/list";
import { openScreamFunc } from "../../../redux/actions/screamActions";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

import "./Fullcalendar.css";
import MainModal from "../Layout/MainModal";

let str = formatDate(new Date(), {
  month: "long",
  year: "numeric",
  day: "numeric",
});

const CalendarWrapper = styled.div`
  z-index: 999;
  padding-right: 2.5%;
  padding-left: 2.5%;
  min-height: 80vh;
  min-width: 95%;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding-bottom: 50vh;
  pointer-events: all;
`;
const CalendarComponent = ({ projectScreams, googleCalendarId, ...props }) => {
  const openProjectRoom = useSelector((state) => state.UI.openProjectRoom);

  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [initState, setInitState] = useState({
    calendarWeekends: true,

    calendarEvents: [
      // initial event data
      {
        title: "Aktion X",
        date: new Date(1623397202 * 1000),
        id: "cIOhFG1vJoI9lDQ0QOPk",
      },
    ],
  });

  useEffect(() => {
    if (googleCalendarId) {
      setInitState({
        ...initState,
        events: {
          googleCalendarId: googleCalendarId,
        },
      });
    }
  }, [googleCalendarId]);

  useEffect(() => {
    const data = [];
    let i;
    let u;

    if (projectScreams) {
      for (i = 0; i < projectScreams.length; i++) {
        if (
          projectScreams[i].selectedUnix === undefined ||
          projectScreams[i].selectedUnix === null
        ) {
          continue;
        }
        for (u = 0; u < projectScreams[i].selectedUnix.length; u++) {
          const eventObject = {
            title: projectScreams[i].title,
            date: new Date(projectScreams[i].selectedUnix[u] * 1000),
            id: projectScreams[i].screamId,
          };
          data.push(eventObject);
        }
      }

      setInitState({ ...initState, calendarEvents: data });
    }
  }, []);

  const handleEventClick = ({ event, el }) => {
    if (projectScreams) {
      const screamId = event.id;
      dispatch(openScreamFunc(screamId));
      props.handleClick(1);
    } else {
      console.log(event);
    }
  };
  const lang = cookies.get("language");
  return (
    <CalendarWrapper>
      <FullCalendar
        plugins={[listMonth, googleCalendarPlugin]}
        googleCalendarApiKey={import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY}
        initialView="listMonth"
        events={openProjectRoom ? initState.calendarEvents : initState.events}
        locale={lang === "de" ? deLocale : enLocale}
        // eventContent={openProjectRoom ? null : renderEventContent}
        eventClick={openProjectRoom ? handleEventClick : null}
      />
    </CalendarWrapper>
  );
};

export default CalendarComponent;