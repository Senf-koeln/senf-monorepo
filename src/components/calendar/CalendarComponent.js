/** @format */

import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import de from "@fullcalendar/core/locales/de";

import listMonth from "@fullcalendar/list";
import { openScream } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";
// Redux stuff
import { connect } from "react-redux";

import "./Fullcalendar.css";

class CalendarComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      calendarWeekends: true,
      calendarEvents: [
        // initial event data
        {
          title: "Aktion X",
          date: new Date(1623397202 * 1000),
          id: "cIOhFG1vJoI9lDQ0QOPk",
        },
      ],
    };
  }
  componentDidMount() {
    const data = [];
    var i;
    var u;
    console.log(this.props.projectScreams);
    for (i = 0; i < this.props.projectScreams.length; i++) {
      if (
        this.props.projectScreams[i].selectedUnix === undefined ||
        this.props.projectScreams[i].selectedUnix === null
      ) {
        continue;
      }
      for (u = 0; u < this.props.projectScreams[i].selectedUnix.length; u++) {
        const eventObject = {
          title: this.props.projectScreams[i].title,
          date: new Date(this.props.projectScreams[i].selectedUnix[u] * 1000),
          id: this.props.projectScreams[i].screamId,
        };
        data.push(eventObject);
      }
    }

    this.setState({
      calendarEvents: data,
    });
  }
  handleEventClick = ({ event, el }) => {
    this.props.openScream(event.id);
  };

  render() {
    return (
      <div
        style={{
          zIndex: 999,
          paddingRight: "2.5%",
          paddingLeft: "2.5%",

          minHeight: "80vh",

          minWidth: "95%",
          display: "flex",
          flexDirection: "row",
          flexGrow: "1",
        }}
      >
        <FullCalendar
          style={{ display: "inline-block", backgroundCoolor: "white" }}
          plugins={[listMonth]}
          initialView="listMonth"
          events={this.state.calendarEvents}
          locale={de}
          eventClick={this.handleEventClick}
        />
      </div>
    );
  }
}

CalendarComponent.propTypes = {
  openScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  openScream,
};

export default connect(mapStateToProps, mapActionsToProps)(CalendarComponent);

// import React from "react";

// import Scheduler, { Resource } from "devextreme-react/scheduler";

// import { data, owners, priorities } from "./data.js";

// // const data = [
// //   {
// //     id: 5,
// //     title: "Conference",
// //     startDate: new Date(2021, 5, 12),
// //     endDate: new Date(2021, 5, 12),
// //     desc: "Big conference for important people",
// //   },

// //   {
// //     id: 14,
// //     title: "Aktion X",
// //     startDate: new Date(new Date().setHours(new Date().getHours() - 3)),
// //     endDate: new Date(new Date().setHours(new Date().getHours() + 3)),
// //   },
// // ];

// const currentDate = new Date(2021, 4, 11);
// const views = ["day", "week", "month", "agenda"];

// class CalendarComponent extends React.Component {
//   state = {
//     view: "day",
//   };
//   render() {
//     return (
//       <Scheduler
//         timeZone="America/Los_Angeles"
//         dataSource={data}
//         views={views}
//         currentView={this.state.view}
//         defaultCurrentDate={currentDate}
//         height={600}
//         currentDate={currentDate}
//         startDayHour={9}
//         onCurrentViewChange={(view) => this.setState({ view })}
//       />
//     );
//   }
// }

// export default CalendarComponent;

// import * as React from "react";
// import moment from "moment";
// import Paper from "@material-ui/core/Paper";
// import FormGroup from "@material-ui/core/FormGroup";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Typography from "@material-ui/core/FormControl";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   ViewState,
//   EditingState,
//   IntegratedEditing,
// } from "@devexpress/dx-react-scheduler";
// import {
//   Scheduler,
//   WeekView,
//   Appointments,
//   AppointmentForm,
//   AppointmentTooltip,
//   DragDropProvider,
//   ViewSwitcher,
//   TodayButton,
//   Toolbar,
//   DateNavigator,
//   DayView,
//   MonthView,
//   Resources,
// } from "@devexpress/dx-react-scheduler-material-ui";

// // import { appointments } from "../../demo-data/appointments";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     margin: theme.spacing(2),
//     padding: theme.spacing(2),
//   },
//   text: theme.typography.h6,
//   formControlLabel: {
//     ...theme.typography.caption,
//     fontSize: "1rem",
//   },
// }));

// const currentDate = moment().format("YYYY-MM-DD");

// const editingOptionsList = [
//   { id: "allowAdding", text: "Adding" },
//   { id: "allowDeleting", text: "Deleting" },
//   { id: "allowUpdating", text: "Updating" },
//   { id: "allowResizing", text: "Resizing" },
//   { id: "allowDragging", text: "Dragging" },
// ];

// const events = [
//   {
//     id: 5,
//     title: "Conference",
//     start: new Date(2021, 5, 14),
//     end: new Date(2021, 5, 14),
//     desc: "Big conference for important people",
//   },

//   {
//     id: 14,
//     title: "Aktion X",
//     start: new Date(new Date().setHours(new Date().getHours() - 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 3)),
//   },
// ];

// const EditingOptionsSelector = ({ options, onOptionsChange }) => {
//   const classes = useStyles();
//   return (
//     <div className={classes.container}>
//       <Typography className={classes.text}>Enabled Options</Typography>
//       <FormGroup row>
//         {editingOptionsList.map(({ id, text }) => (
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={options[id]}
//                 onChange={onOptionsChange}
//                 value={id}
//                 color="primary"
//               />
//             }
//             classes={{ label: classes.formControlLabel }}
//             label={text}
//             key={id}
//             disabled={
//               (id === "allowDragging" || id === "allowResizing") &&
//               !options.allowUpdating
//             }
//           />
//         ))}
//       </FormGroup>
//     </div>
//   );
// };

// export default () => {
//   const [data, setData] = React.useState(events);
//   const [editingOptions, setEditingOptions] = React.useState({
//     allowAdding: true,
//     allowDeleting: true,
//     allowUpdating: true,
//     allowDragging: true,
//     allowResizing: true,
//   });
//   const [addedAppointment, setAddedAppointment] = React.useState({});
//   const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
//     React.useState(false);

//   const {
//     allowAdding,
//     allowDeleting,
//     allowUpdating,
//     allowResizing,
//     allowDragging,
//   } = editingOptions;

//   const onCommitChanges = React.useCallback(
//     ({ added, changed, deleted }) => {
//       if (added) {
//         const startingAddedId =
//           data.length > 0 ? data[data.length - 1].id + 1 : 0;
//         setData([...data, { id: startingAddedId, ...added }]);
//       }
//       if (changed) {
//         setData(
//           data.map((appointment) =>
//             changed[appointment.id]
//               ? { ...appointment, ...changed[appointment.id] }
//               : appointment
//           )
//         );
//       }
//       if (deleted !== undefined) {
//         setData(data.filter((appointment) => appointment.id !== deleted));
//       }
//       setIsAppointmentBeingCreated(false);
//     },
//     [setData, setIsAppointmentBeingCreated, data]
//   );
//   const onAddedAppointmentChange = React.useCallback((appointment) => {
//     setAddedAppointment(appointment);
//     setIsAppointmentBeingCreated(true);
//   });
//   const handleEditingOptionsChange = React.useCallback(({ target }) => {
//     const { value } = target;
//     const { [value]: checked } = editingOptions;
//     setEditingOptions({
//       ...editingOptions,
//       [value]: !checked,
//     });
//   });

//   const TimeTableCell = React.useCallback(
//     React.memo(({ onDoubleClick, ...restProps }) => (
//       <WeekView.TimeTableCell
//         {...restProps}
//         onDoubleClick={allowAdding ? onDoubleClick : undefined}
//       />
//     )),
//     [allowAdding]
//   );

//   const CommandButton = React.useCallback(
//     ({ id, ...restProps }) => {
//       if (id === "deleteButton") {
//         return (
//           <AppointmentForm.CommandButton
//             id={id}
//             {...restProps}
//             disabled={!allowDeleting}
//           />
//         );
//       }
//       return <AppointmentForm.CommandButton id={id} {...restProps} />;
//     },
//     [allowDeleting]
//   );

//   const allowDrag = React.useCallback(
//     () => allowDragging && allowUpdating,
//     [allowDragging, allowUpdating]
//   );
//   const allowResize = React.useCallback(
//     () => allowResizing && allowUpdating,
//     [allowResizing, allowUpdating]
//   );

//   var resources = [
//     {
//       fieldName: "location",
//       title: "Location",
//       instances: [
//         { id: "Room 1", text: "Room 1" },
//         { id: "Room 2", text: "Room 2" },
//         { id: "Room 3", text: "Room 3" },
//         { id: "Room 4", text: "Room 4" },
//         { id: "Room 5", text: "Room 5" },
//       ],
//     },
//   ];

//   console.log(data);
//   for (var i = 0; i < data.length; i++) {}

//   return (
//     <React.Fragment>
//       {/* <EditingOptionsSelector
//         options={editingOptions}
//         onOptionsChange={handleEditingOptionsChange}
//       /> */}

//       <Paper>
//         <Scheduler data={data} height={600} firstDayOfWeek={1} locale={"de-GR"}>
//           <ViewState
//             // currentDate={currentDate}
//             defaultCurrentDate={currentDate}
//             defaultCurrentViewName="Week"
//           />
//           <EditingState
//             onCommitChanges={onCommitChanges}
//             addedAppointment={addedAppointment}
//             onAddedAppointmentChange={onAddedAppointmentChange}
//           />

//           <IntegratedEditing />
//           <WeekView
//             startDayHour={7}
//             endDayHour={19}
//             timeTableCellComponent={TimeTableCell}
//           />
//           <Toolbar />
//           <DateNavigator />
//           <TodayButton />
//           <DayView startDayHour={7} endDayHour={19} />
//           <MonthView />

//           <Appointments />
//           <Resources data={resources} mainResourceName="roomId" />
//           {/* <AppointmentTooltip showOpenButton showDeleteButton={allowDeleting} />
//           <AppointmentForm
//             commandButtonComponent={CommandButton}
//             readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
//           /> */}
//           {/* <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} /> */}
//           <ViewSwitcher />
//         </Scheduler>
//       </Paper>
//     </React.Fragment>
//   );
// };
