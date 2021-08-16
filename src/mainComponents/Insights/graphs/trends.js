/** @format */

import React, { Component } from "react";

//Redux
import { connect } from "react-redux";

//Graphs
import createPlotlyComponent from "react-plotlyjs";
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from "plotly.js/dist/plotly-cartesian";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlotlyComponent = createPlotlyComponent(Plotly);

const styles = {
  root: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    padding: "0",
  },

  paper: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    boxShadow: "none",
    overflow: "hidden",
    padding: "0",
    top: "8em",
    borderRadius: "10px",
  },

  closeButton: {
    position: "absolute",
    top: "2.5vw",
    left: "2.5vw",
    color: "black",
    zIndex: "990",
    padding: 10,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    zIndex: 9,
  },
  dialogcontent: {
    position: "fixed",
    marginLeft: "2.5vw",

    width: "95vw",
    height: "auto",
  },

  card: {
    marginTop: "2.5vw",
    top: "0em",
    position: "relative",
    width: "100%",
    paddingTop: "1em",
    backgroundColor: "white",
    height: "auto",
    paddingBottom: "3em",
    borderRadius: "10px",
    overflow: "hidden",
  },
  title: {
    fontFamily: "Futura PT W01-Bold",
    position: "relative",
    height: "1em",
    width: "100%",
    fontSize: "28",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Futura PT W01 Book",
    position: "relative",
    height: "auto",
    width: "100%",
    fontSize: "20",
    textAlign: "center",
  },

  plot: {
    top: "5vh",
    position: "relative",
    width: "100%",
    zIndex: 999,
  },
  clickblocker: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "9",
  },
};

export class Trends extends Component {
  state = {
    open: false,

    oldPath: "",
    newPath: "",
    path: "",
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    function sum(input) {
      if (toString.call(input) !== "[object Array]") return false;

      var total = 0;
      for (var i = 0; i < input.length; i++) {
        if (isNaN(input[i])) {
          continue;
        }
        total += Number(input[i]);
      }
      return total;
    }

    let Rad = [];

    let Inklusion_Soziales = [];

    let Verkehr = [];

    let Umwelt = [];

    let Versorgung = [];

    let Sport_Freizeit = [];

    let Sonstige = [];
    let SonstigeLength = [];
    let Sonstige_text = [];

    const Thema_nach_wunsch_array = this.props.data.screams;
    if (
      Thema_nach_wunsch_array !== undefined &&
      Thema_nach_wunsch_array.length > 0
    ) {
      Thema_nach_wunsch_array.forEach((element) => {
        if (element.Thema == "Rad") {
          Rad.push(element.likeCount);
        }
        if (element.Thema == "Inklusion / Soziales") {
          Inklusion_Soziales.push(element.likeCount);
        }
        if (element.Thema == "Verkehr") {
          Verkehr.push(element.likeCount);
        }

        if (element.Thema == "Umwelt und Grün") {
          Umwelt.push(element.likeCount);
        }
        if (element.Thema == "Versorgung") {
          Versorgung.push(element.likeCount);
        }
        if (element.Thema == "Sport / Freizeit") {
          Sport_Freizeit.push(element.likeCount);
        }
        if (element.Thema == "Sonstige") {
          Sonstige.push(element.likeCount);
        }
      });
    }

    let Sonstigetrue = 0;
    if (Sonstige.length > 0) {
      SonstigeLength = Sonstige.length;
      Sonstige_text = "Sonstige";
      Sonstigetrue = 1;
    }

    let data = [
      {
        line: { color: "#8dd9b8", shape: "spline" },
        name: "Umwelt und Grün",
        type: "scatter",
        x: [
          new Date("2020-03-02"),
          new Date("2020-04-02"),
          new Date("2020-04-13"),
          new Date("2020-07-13"),
        ],
        y: [2, 3, 4, 4],
      },
      {
        line: { color: "#929df6", shape: "spline" },
        name: "Rad",
        type: "scatter",
        x: [
          new Date("2020-03-02"),
          new Date("2020-04-13"),
          new Date("2020-05-04"),
          new Date("2020-05-18"),
          new Date("2020-05-25"),
          new Date("2020-07-06"),
          new Date("2020-07-13"),
        ],
        y: [1, 2, 3, 4, 5, 6, 6],
      },
      {
        line: { color: "#91dff4", shape: "spline" },
        name: "Verkehr",
        type: "scatter",
        x: [
          new Date("2020-03-02"),
          new Date("2020-04-13"),
          new Date("2020-07-06"),
          new Date("2020-07-13"),
        ],
        y: [2, 4, 7, 8],
      },
      {
        line: { color: "#e8907e", shape: "spline" },
        name: "Inklusion / Soziales",
        type: "scatter",
        x: [
          new Date("2020-03-02"),
          new Date("2020-04-13"),
          new Date("2020-07-13"),
        ],
        y: [1, 2, 2],
      },
      {
        line: { color: "#f6c095", shape: "spline" },
        name: "Sport / Freizeit",
        type: "scatter",
        x: [
          new Date("2020-04-13"),
          new Date("2020-06-22"),
          new Date("2020-07-13"),
        ],
        y: [1, 3, 3],
      },
      {
        line: { color: "#bd98f6", shape: "spline" },
        name: "Versorgung",
        type: "scatter",
        x: [
          new Date("2020-06-22"),
          new Date("2020-07-06"),
          new Date("2020-07-13"),
        ],
        y: [1, 2, 2],
      },
    ];

    let layout = {
      //   barmode: "relative",
      showlegend: false,

      template: "...",
      font: { color: "#414345", family: "Futura PT W01 Book", size: 14 },
      //   autosize: true,
      //   height: 300,
      //   hovermode: false,
      //   legend: { title: { text: "Thema" }, tracegroupgap: 0 },
      margin: { b: 40, l: 40, r: 0, t: 20 },

      xaxis: {
        // rangeslider: { visible: true },
        // type: "date",
        rangeselector: {
          buttons: [
            // {
            //   count: 2,
            //   label: "Letzte Woche",
            //   step: "week",
            //   stepmode: "todate",
            // },
            {
              count: 2,
              label: "Letzter Monat",
              step: "month",
              stepmode: "todate",
            },
            // { count: 1, label: "YTD", step: "year", stepmode: "todate" },
            {
              count: 3,
              label: "Letzte 3 Monate",
              step: "month",
              stepmode: "backward",
            },
            { step: "all", label: "Gesamt" },
          ],
        },

        tickformatstops: [
          { dtickrange: [0, 1000], value: "%H:%M:%S.%L ms" },
          { dtickrange: [1000, 60000], value: "%H:%M:%S s" },
          { dtickrange: [60000, 3600000], value: "%H:%M m" },
          { dtickrange: [3600000, 86400000], value: "%H:%M h" },
          { dtickrange: [86400000, 604800000], value: "%e. %b" },
          { dtickrange: [604800000, "M1"], value: "%e. %b" },
          { dtickrange: ["M1", "M12"], value: "%b '%y" },
          { dtickrange: ["M12", 0], value: "%Y Y" },
        ],
      },

      yaxis: {
        fixedrange: true,
        title: { text: "Ideen" },
      },
    };

    let config = {
      showLink: false,
      displayModeBar: false,
    };

    return (
      <div className={classes.card}>
        {/* <div className={classes.clickblocker}></div> */}
        <div className={classes.title}>Themen-Trends</div>

        <PlotlyComponent
          className={classes.plot}
          data={data}
          layout={layout}
          config={config}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(Trends));
