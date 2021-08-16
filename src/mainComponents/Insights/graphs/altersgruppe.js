/** @format */

import React, { Component } from "react";
import axios from "axios";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

//Icons
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CircularProgress from "@material-ui/core/CircularProgress";

//Graphs
import createPlotlyComponent from "react-plotlyjs";
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from "plotly.js/dist/plotly-cartesian";
const PlotlyComponent = createPlotlyComponent(Plotly);

const AllCheckbox = withStyles({
  root: {
    color: "#000000",
    "&$checked": {
      color: "#000000",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlueCheckbox = withStyles({
  root: {
    color: "#929df6",
    "&$checked": {
      color: "#929df6",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RedCheckbox = withStyles({
  root: {
    color: "#e8907e",
    "&$checked": {
      color: "#e8907e",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const GreenCheckbox = withStyles({
  root: {
    color: "#8dd9b8",
    "&$checked": {
      color: "#8dd9b8",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const LightblueCheckbox = withStyles({
  root: {
    color: "#91dff4",
    "&$checked": {
      color: "#91dff4",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const OrangeCheckbox = withStyles({
  root: {
    color: "#f6c095",
    "&$checked": {
      color: "#f6c095",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const PurpleCheckbox = withStyles({
  root: {
    color: "#bd98f6",
    "&$checked": {
      color: "#bd98f6",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export class Altersgruppe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 4,
      agegroups: [],
      checked: 1,
      checked1: "Empty",
      checked2: "Empty",
      checked3: "Empty",
      checked4: "Empty",
      checked5: "Empty",
      checked6: "Empty",
      checked7: "Empty",
    };
  }

  componentDidMount() {
    axios.get("/agegroups").then((res) => {
      this.setState({ agegroups: res.data });
    });
  }

  handleLegend = (checked) => {
    this.setState({
      checked,
      checked1: "Empty",
      checked2: "Empty",
      checked3: "Empty",
      checked4: "Empty",
      checked5: "Empty",
      checked6: "Empty",
      checked7: "Empty",
    });
  };

  handleLegend1 = (checked1) => {
    if (this.state.checked1 === "Empty") {
      this.setState({
        checked1,
        checked: false,
      });
    } else {
      this.setState({
        checked1: "Empty",
      });
      if (
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend2 = (checked2) => {
    if (this.state.checked2 === "Empty") {
      this.setState({
        checked2,
        checked: false,
      });
    } else {
      this.setState({
        checked2: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend3 = (checked3) => {
    if (this.state.checked3 === "Empty") {
      this.setState({
        checked3,
        checked: false,
      });
    } else {
      this.setState({
        checked3: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend4 = (checked4) => {
    if (this.state.checked4 === "Empty") {
      this.setState({
        checked4,
        checked: false,
      });
    } else {
      this.setState({
        checked4: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend5 = (checked5) => {
    if (this.state.checked5 === "Empty") {
      this.setState({
        checked5,
        checked: false,
      });
    } else {
      this.setState({
        checked5: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend6 = (checked6) => {
    if (this.state.checked6 === "Empty") {
      this.setState({
        checked6,
        checked: false,
      });
    } else {
      this.setState({
        checked6: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend7 = (checked7) => {
    if (this.state.checked7 === "Empty") {
      this.setState({
        checked7,
        checked: false,
      });
    } else {
      this.setState({
        checked7: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  render() {
    const { classes } = this.props;
    const { agegroups } = this.state;

    const themenfilter = (
      <div className={classes.legendwrapper}>
        <FormGroup row className={classes.legend}>
          <FormControlLabel
            control={
              <AllCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => this.handleLegend(1)}
                checked={this.state.checked === 1}
              />
            }
            label="Alle Themen"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => this.handleLegend1("Rad")}
                checked={this.state.checked1 === "Rad"}
              />
            }
            label="Rad"
          />
          <FormControlLabel
            control={
              <RedCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => this.handleLegend2("Inklusion / Soziales")}
                checked={this.state.checked2 === "Inklusion / Soziales"}
              />
            }
            label="Inklusion / Soziales"
          />
          <FormControlLabel
            control={
              <LightblueCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => this.handleLegend3("Verkehr")}
                checked={this.state.checked3 === "Verkehr"}
              />
            }
            label="Verkehr"
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => this.handleLegend4("Umwelt und Grün")}
                checked={this.state.checked4 === "Umwelt und Grün"}
              />
            }
            label="Umwelt und Grün"
          />
          <FormControlLabel
            control={
              <PurpleCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => this.handleLegend5("Versorgung")}
                checked={this.state.checked5 === "Versorgung"}
              />
            }
            label="Versorgung"
          />
          <FormControlLabel
            control={
              <OrangeCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => this.handleLegend6("Sport / Freizeit")}
                checked={this.state.checked6 === "Sport / Freizeit"}
              />
            }
            label="Sport / Freizeit"
          />
        </FormGroup>
      </div>
    );

    const agegroups_array = agegroups;
    let agegroups_new_likes = [];
    let agegroups_new_wishes = [];
    if (agegroups_array !== undefined && agegroups_array.length > 0) {
      agegroups_array.forEach((element) => {
        agegroups_new_likes.push(element.agegroupsLikes);
        agegroups_new_wishes.push(element.agegroupsWishes);
      });
    }

    let Versorgung = [];
    if (
      (this.state.checked5 === "Versorgung") | (this.state.checked === 1) &&
      agegroups_new_wishes !== undefined &&
      agegroups_new_likes !== undefined &&
      agegroups_new_wishes.length > 0 &&
      agegroups_new_likes.length > 0
    ) {
      Versorgung.push(
        -agegroups_new_wishes[0]["Altersgruppe1"],
        agegroups_new_likes[0]["Altersgruppe1"],

        -agegroups_new_wishes[0]["Altersgruppe2"],
        agegroups_new_likes[0]["Altersgruppe2"],

        -agegroups_new_wishes[0]["Altersgruppe3"],
        agegroups_new_likes[0]["Altersgruppe3"],

        -agegroups_new_wishes[0]["Altersgruppe4"],
        agegroups_new_likes[0]["Altersgruppe4"],

        -agegroups_new_wishes[0]["Altersgruppe5"],
        agegroups_new_likes[0]["Altersgruppe5"],

        -agegroups_new_wishes[0]["Altersgruppe6"],
        agegroups_new_likes[0]["Altersgruppe6"],

        -agegroups_new_wishes[0]["Altersgruppe7"],
        agegroups_new_likes[0]["Altersgruppe7"]
      );
    }

    let Rad = [];
    if (
      (this.state.checked1 === "Rad") | (this.state.checked === 1) &&
      agegroups_new_wishes !== undefined &&
      agegroups_new_likes !== undefined &&
      agegroups_new_wishes.length > 0 &&
      agegroups_new_likes.length > 0
    ) {
      Rad.push(
        -agegroups_new_wishes[1]["Altersgruppe1"],
        agegroups_new_likes[1]["Altersgruppe1"],

        -agegroups_new_wishes[1]["Altersgruppe2"],
        agegroups_new_likes[1]["Altersgruppe2"],

        -agegroups_new_wishes[1]["Altersgruppe3"],
        agegroups_new_likes[1]["Altersgruppe3"],

        -agegroups_new_wishes[1]["Altersgruppe4"],
        agegroups_new_likes[1]["Altersgruppe4"],

        -agegroups_new_wishes[1]["Altersgruppe5"],
        agegroups_new_likes[1]["Altersgruppe5"],

        -agegroups_new_wishes[1]["Altersgruppe6"],
        agegroups_new_likes[1]["Altersgruppe6"],

        -agegroups_new_wishes[1]["Altersgruppe7"],
        agegroups_new_likes[1]["Altersgruppe7"]
      );
    }

    let Umwelt = [];
    if (
      (this.state.checked4 === "Umwelt und Grün") |
        (this.state.checked === 1) &&
      agegroups_new_wishes !== undefined &&
      agegroups_new_likes !== undefined &&
      agegroups_new_wishes.length > 0 &&
      agegroups_new_likes.length > 0
    ) {
      Umwelt.push(
        -agegroups_new_wishes[2]["Altersgruppe1"],
        agegroups_new_likes[2]["Altersgruppe1"],

        -agegroups_new_wishes[2]["Altersgruppe2"],
        agegroups_new_likes[2]["Altersgruppe2"],

        -agegroups_new_wishes[2]["Altersgruppe3"],
        agegroups_new_likes[2]["Altersgruppe3"],

        -agegroups_new_wishes[2]["Altersgruppe4"],
        agegroups_new_likes[2]["Altersgruppe4"],

        -agegroups_new_wishes[2]["Altersgruppe5"],
        agegroups_new_likes[2]["Altersgruppe5"],

        -agegroups_new_wishes[2]["Altersgruppe6"],
        agegroups_new_likes[2]["Altersgruppe6"],

        -agegroups_new_wishes[2]["Altersgruppe7"],
        agegroups_new_likes[2]["Altersgruppe7"]
      );
    }

    let Sport_Freizeit = [];
    if (
      (this.state.checked6 === "Sport / Freizeit") |
        (this.state.checked === 1) &&
      agegroups_new_wishes !== undefined &&
      agegroups_new_likes !== undefined &&
      agegroups_new_wishes.length > 0 &&
      agegroups_new_likes.length > 0
    ) {
      Sport_Freizeit.push(
        -agegroups_new_wishes[3]["Altersgruppe1"],
        agegroups_new_likes[3]["Altersgruppe1"],

        -agegroups_new_wishes[3]["Altersgruppe2"],
        agegroups_new_likes[3]["Altersgruppe2"],

        -agegroups_new_wishes[3]["Altersgruppe3"],
        agegroups_new_likes[3]["Altersgruppe3"],

        -agegroups_new_wishes[3]["Altersgruppe4"],
        agegroups_new_likes[3]["Altersgruppe4"],

        -agegroups_new_wishes[3]["Altersgruppe5"],
        agegroups_new_likes[3]["Altersgruppe5"],

        -agegroups_new_wishes[3]["Altersgruppe6"],
        agegroups_new_likes[3]["Altersgruppe6"],

        -agegroups_new_wishes[3]["Altersgruppe7"],
        agegroups_new_likes[3]["Altersgruppe7"]
      );
    }
    let Inklusion_Soziales = [];
    if (
      (this.state.checked2 === "Inklusion / Soziales") |
        (this.state.checked === 1) &&
      agegroups_new_wishes !== undefined &&
      agegroups_new_likes !== undefined &&
      agegroups_new_wishes.length > 0 &&
      agegroups_new_likes.length > 0
    ) {
      Inklusion_Soziales.push(
        -agegroups_new_wishes[4]["Altersgruppe1"],
        agegroups_new_likes[4]["Altersgruppe1"],

        -agegroups_new_wishes[4]["Altersgruppe2"],
        agegroups_new_likes[4]["Altersgruppe2"],

        -agegroups_new_wishes[4]["Altersgruppe3"],
        agegroups_new_likes[4]["Altersgruppe3"],

        -agegroups_new_wishes[4]["Altersgruppe4"],
        agegroups_new_likes[4]["Altersgruppe4"],

        -agegroups_new_wishes[4]["Altersgruppe5"],
        agegroups_new_likes[4]["Altersgruppe5"],

        -agegroups_new_wishes[4]["Altersgruppe6"],
        agegroups_new_likes[4]["Altersgruppe6"],

        -agegroups_new_wishes[4]["Altersgruppe7"],
        agegroups_new_likes[4]["Altersgruppe7"]
      );
    }

    let Verkehr = [];
    if (
      (this.state.checked3 === "Verkehr") | (this.state.checked === 1) &&
      agegroups_new_wishes !== undefined &&
      agegroups_new_likes !== undefined &&
      agegroups_new_wishes.length > 0 &&
      agegroups_new_likes.length > 0
    ) {
      Verkehr.push(
        -agegroups_new_wishes[5]["Altersgruppe1"],
        agegroups_new_likes[5]["Altersgruppe1"],

        -agegroups_new_wishes[5]["Altersgruppe2"],
        agegroups_new_likes[5]["Altersgruppe2"],

        -agegroups_new_wishes[5]["Altersgruppe3"],
        agegroups_new_likes[5]["Altersgruppe3"],

        -agegroups_new_wishes[5]["Altersgruppe4"],
        agegroups_new_likes[5]["Altersgruppe4"],

        -agegroups_new_wishes[5]["Altersgruppe5"],
        agegroups_new_likes[5]["Altersgruppe5"],

        -agegroups_new_wishes[5]["Altersgruppe6"],
        agegroups_new_likes[5]["Altersgruppe6"],

        -agegroups_new_wishes[5]["Altersgruppe7"],
        agegroups_new_likes[5]["Altersgruppe7"]
      );
    }

    let data = [
      {
        alignmentgroup: true,

        legendgroup: "Rad",
        marker: { color: "#929df6" },
        name: "Rad",
        offsetgroup: "Rad",
        orientation: "h",
        showlegend: false,
        textposition: "auto",
        type: "bar",
        x: Rad,
        xaxis: "x",
        y: [
          "< 18",
          "< 18",
          "18 - 24",
          "18 - 24",
          "25-34",
          "25-34",
          "35-44",
          "35-44",
          "45-54",
          "45-54",
          "55-64",
          "55-64",
          "65+",
          "65+",
        ],

        yaxis: "y",
      },
      {
        alignmentgroup: true,
        legendgroup: "Inklusion / Soziales",
        marker: { color: "#e8907e" },
        name: "Inklusion / Soziales",
        offsetgroup: "Inklusion / Soziales",
        orientation: "h",
        showlegend: false,
        textposition: "auto",
        type: "bar",
        x: Inklusion_Soziales,
        xaxis: "x",
        y: [
          "< 18",
          "< 18",
          "18 - 24",
          "18 - 24",
          "25-34",
          "25-34",
          "35-44",
          "35-44",
          "45-54",
          "45-54",
          "55-64",
          "55-64",
          "65+",
          "65+",
        ],
        yaxis: "y",
      },
      {
        alignmentgroup: true,
        legendgroup: "Verkehr",
        marker: { color: "#91dff4" },
        name: "Verkehr",
        offsetgroup: "Verkehr",
        orientation: "h",
        showlegend: false,
        textposition: "auto",
        type: "bar",
        x: Verkehr,
        xaxis: "x",
        y: [
          "< 18",
          "< 18",
          "18 - 24",
          "18 - 24",
          "25-34",
          "25-34",
          "35-44",
          "35-44",
          "45-54",
          "45-54",
          "55-64",
          "55-64",
          "65+",
          "65+",
        ],
        yaxis: "y",
      },
      {
        alignmentgroup: true,
        legendgroup: "Umwelt und Grün",
        marker: { color: "#8dd9b8" },
        name: "Umwelt und Grün",
        offsetgroup: "Umwelt und Grün",
        orientation: "h",
        showlegend: false,
        textposition: "auto",
        type: "bar",
        x: Umwelt,
        xaxis: "x",
        y: [
          "< 18",
          "< 18",
          "18 - 24",
          "18 - 24",
          "25-34",
          "25-34",
          "35-44",
          "35-44",
          "45-54",
          "45-54",
          "55-64",
          "55-64",
          "65+",
          "65+",
        ],
        yaxis: "y",
      },
      {
        alignmentgroup: true,
        legendgroup: "Versorgung",
        marker: { color: "#bd98f6" },
        name: "Versorgung",
        offsetgroup: "Versorgung",
        orientation: "h",
        showlegend: false,
        textposition: "auto",
        type: "bar",
        x: Versorgung,
        xaxis: "x",
        y: [
          "< 18",
          "< 18",
          "18 - 24",
          "18 - 24",
          "25-34",
          "25-34",
          "35-44",
          "35-44",
          "45-54",
          "45-54",
          "55-64",
          "55-64",
          "65+",
          "65+",
        ],
        yaxis: "y",
      },
      {
        alignmentgroup: true,
        legendgroup: "Sport / Freizeit",
        marker: { color: "#f6c095" },
        name: "Sport / Freizeit",
        offsetgroup: "Sport / Freizeit",
        orientation: "h",
        showlegend: false,
        textposition: "auto",
        type: "bar",
        x: Sport_Freizeit,
        xaxis: "x",
        y: [
          "< 18",
          "< 18",
          "18 - 24",
          "18 - 24",
          "25-34",
          "25-34",
          "35-44",
          "35-44",
          "45-54",
          "45-54",
          "55-64",
          "55-64",
          "65+",
          "65+",
        ],
        yaxis: "y",
      },
    ];
    let layout = {
      annotations: [
        {
          x: 0,
          y: 7,
          xref: "x",
          yref: "y",
          text: "Ideen | Votes",
          ay: 0,
          ax: -1,
          arrowcolor: "rgba(255, 0, 255, 0.53)",
          arrowhead: 5,
          arrowsize: 1,
          showarrow: true,
        },
      ],
      barmode: "relative",
      font: { color: "#414345", family: "Futura PT W01 Book", size: 14 },
      autosize: true,
      height: 300,
      hovermode: false,
      margin: { b: 40, l: 45, r: 0, t: 20 },
      shapes: [
        {
          line: { color: "white", width: 2 },
          type: "line",
          x0: 0,
          x1: 0,
          y0: -0.5,
          y1: 6.5,
        },
      ],
      template: "...",
      xaxis: {
        anchor: "x",
        fixedrange: true,
        domain: [0.0, 1.0],
        showgrid: false,
        zeroline: false,
        showline: false,
        linewidth: 2,
        tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
        tickvals: [
          -1000, -500, -200, -100, -50, -25, -10, 0, 10, 25, 50, 100, 200,
        ],
        ticktext: [
          "1000",
          "500",
          "200",
          "100",
          "50",
          "25",
          "10",
          "|",
          "10",
          "25",
          "50",
          "100",
          "200",
          "500",
          "1000",
        ],
        linecolor: "white",
      },

      xaxis2: {
        title: "trend2",
        anchor: "x",
        fixedrange: true,
        domain: [1.0, 0],
        showgrid: false,
        zeroline: false,
        showline: false,
        linewidth: 2,

        tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
        tickvals: [-500, -250, -100, -50, 0, 50, 100, 250, 500],
        ticktext: ["500", "250", "100", "50", "|", "50", "100", "250", "500"],
        linecolor: "white",
        mirror: true,
      },
      yaxis: {
        anchor: "x",
        fixedrange: true,
        categoryarray: [
          "65+",
          "55-64",
          "45-54",
          "35-44",
          "25-34",
          "18 - 24",
          "< 18",
        ],

        categoryorder: "array",
        tickcolor: "white",
        ticklen: 0,
        ticks: "outside",
        title: { text: "" },
        showgrid: false,
      },

      domain: [0.0, 1.0],
      //   title: {
      //     text: "Wünsche | Stimmen",
      //     textposition: "middle center",
      //     xanchor: "center",
      //     x: 0.5,
      //     y: 1.1,
      //     font: {
      //       size: 15
      //     }
      //   }
    };

    let config = {
      showLink: false,
      displayModeBar: false,
    };

    const plot =
      agegroups_new_wishes !== undefined &&
      agegroups_new_likes !== undefined &&
      agegroups_new_wishes.length > 0 &&
      agegroups_new_likes.length > 0 ? (
        <PlotlyComponent
          className={classes.plot}
          data={data}
          layout={layout}
          config={config}
        />
      ) : (
        <CircularProgress size={50} thickness={2} />
      );

    return (
      <div className={classes.card}>
        <div className={classes.title}>Altersgruppen</div>
        <div className={classes.subtitle}>
          Anhand der gesammelten Ideen und Votes kannst du die Relevanz der
          Themen für die unterschiedlichen Altersgruppen erkennen und nach
          Themen filtern.
        </div>

        {themenfilter}
        <div className={classes.clickblocker}></div>
        {plot}
      </div>
    );
  }
}

export default Altersgruppe;
