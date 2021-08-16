/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

//Icons
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

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

const YewllowCheckbox = withStyles({
  root: {
    color: "#f9db95",
    "&$checked": {
      color: "#f9db95",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const styles = {};
export class Stadtteil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 4,
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
    const { screams } = this.props.data;

    const SonstigeLegende = [];
    const SonstiigedataArray = screams;
    if (SonstiigedataArray !== undefined && SonstiigedataArray.length > 0) {
      SonstiigedataArray.forEach((element) => {
        if (element.Thema === "Sonstige") {
          SonstigeLegende.push(element);
        }
      });
    }
    const Sonstigefilter =
      SonstigeLegende.length > 0 ? (
        <FormControlLabel
          control={
            <YewllowCheckbox
              icon={<FiberManualRecordIcon />}
              checkedIcon={
                <FiberManualRecordIcon className="activelegenditem" />
              }
              onChange={() => this.handleLegend7("Sonstige")}
              checked={this.state.checked7 === "Sonstige"}
            />
          }
          label="Sonstige"
        />
      ) : null;
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
          {Sonstigefilter}
        </FormGroup>
      </div>
    );

    let Rad = [];
    let Rad_one = [];
    let Rad_likes = [];

    let Inklusion_Soziales = [];
    let Inklusion_Soziales_one = [];
    let Inklusion_Soziales_likes = [];

    let Verkehr = [];
    let Verkehr_one = [];
    let Verkehr_likes = [];

    let Umwelt = [];
    let Umwelt_one = [];
    let Umwelt_likes = [];

    let Versorgung = [];
    let Versorgung_one = [];
    let Versorgung_likes = [];

    let Sport_Freizeit = [];
    let Sport_Freizeit_one = [];
    let Sport_Freizeit_likes = [];

    let Sonstige = [];
    let Sonstige_one = [];
    let Sonstige_likes = [];

    const Thema_nach_wunsch_array = screams;
    if (
      Thema_nach_wunsch_array !== undefined &&
      Thema_nach_wunsch_array.length > 0
    ) {
      Thema_nach_wunsch_array.forEach((element) => {
        if (
          element.Thema === "Rad" &&
          (element.Thema !== undefined &&
            element.Thema === this.state.checked1) |
            (this.state.checked === 1)
        ) {
          Rad.push(element.Stadtteil);
          Rad_one.push(1);
          Rad_likes.push(element.likeCount);
        }
        if (
          element.Thema === "Inklusion / Soziales" &&
          (element.Thema !== undefined &&
            element.Thema === this.state.checked2) |
            (this.state.checked === 1)
        ) {
          Inklusion_Soziales.push(element.Stadtteil);
          Inklusion_Soziales_one.push(1);
          Inklusion_Soziales_likes.push(element.likeCount);
        }
        if (
          element.Thema === "Verkehr" &&
          (element.Thema !== undefined &&
            element.Thema === this.state.checked3) |
            (this.state.checked === 1)
        ) {
          Verkehr.push(element.Stadtteil);
          Verkehr_one.push(1);
          Verkehr_likes.push(element.likeCount);
        }

        if (
          element.Thema === "Umwelt und Grün" &&
          (element.Thema !== undefined &&
            element.Thema === this.state.checked4) |
            (this.state.checked === 1)
        ) {
          Umwelt.push(element.Stadtteil);
          Umwelt_one.push(1);
          Umwelt_likes.push(element.likeCount);
        }
        if (
          element.Thema === "Versorgung" &&
          (element.Thema !== undefined &&
            element.Thema === this.state.checked5) |
            (this.state.checked === 1)
        ) {
          Versorgung.push(element.Stadtteil);
          Versorgung_one.push(1);
          Versorgung_likes.push(element.likeCount);
        }
        if (
          element.Thema === "Sport / Freizeit" &&
          (element.Thema !== undefined &&
            element.Thema === this.state.checked6) |
            (this.state.checked === 1)
        ) {
          Sport_Freizeit.push(element.Stadtteil);
          Sport_Freizeit_one.push(1);
          Sport_Freizeit_likes.push(element.likeCount);
        }
        if (
          element.Thema === "Sonstige" &&
          (element.Thema !== undefined &&
            element.Thema === this.state.checked7) |
            (this.state.checked === 1)
        ) {
          Sonstige.push(element.Stadtteil);
          Sonstige_one.push(1);
          Sonstige_likes.push(element.likeCount);
        }
      });
    }

    let Rad_one_negative = Rad_one.map(
      (v) => -(Math.floor(Math.abs(v) * 100) / 100)
    );
    let Inklusion_Soziales_one_negative = Inklusion_Soziales_one.map(
      (v) => -(Math.floor(Math.abs(v) * 100) / 100)
    );
    let Verkehr_one_negative = Verkehr_one.map(
      (v) => -(Math.floor(Math.abs(v) * 100) / 100)
    );
    let Umwelt_one_negative = Umwelt_one.map(
      (v) => -(Math.floor(Math.abs(v) * 100) / 100)
    );
    let Versorgung_one_negative = Versorgung_one.map(
      (v) => -(Math.floor(Math.abs(v) * 100) / 100)
    );
    let Sport_Freizeit_one_negative = Sport_Freizeit_one.map(
      (v) => -(Math.floor(Math.abs(v) * 100) / 100)
    );
    let Sonstige_one_negative = Sonstige_one.map(
      (v) => -(Math.floor(Math.abs(v) * 100) / 100)
    );

    let stadtteile_merge = [
      ...Rad,
      ...Inklusion_Soziales,
      ...Verkehr,
      ...Umwelt,
      ...Versorgung,
      ...Sport_Freizeit,
      ...Sonstige,
    ];
    let stadtteile_unique = [...new Set(stadtteile_merge)];
    let linelength = stadtteile_unique.length - 0.5;

    let plotheight = 100 + linelength * 30;

    let data = [
      {
        alignmentgroup: true,

        legendgroup: "Rad",
        marker: {
          color: "#929df6",
        },
        name: "Rad",
        offsetgroup: "Rad",
        orientation: "h",
        showlegend: false,
        textposition: "auto",
        type: "bar",
        x: [...Rad_one_negative, ...Rad_likes],
        xaxis: "x",
        y: [...Rad, ...Rad],
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
        x: [...Inklusion_Soziales_one_negative, ...Inklusion_Soziales_likes],
        xaxis: "x",
        y: [...Inklusion_Soziales, ...Inklusion_Soziales],
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
        x: [...Verkehr_one_negative, ...Verkehr_likes],
        xaxis: "x",
        y: [...Verkehr, ...Verkehr],
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
        x: [...Umwelt_one_negative, ...Umwelt_likes],
        xaxis: "x",
        y: [...Umwelt, ...Umwelt],
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
        x: [...Versorgung_one_negative, ...Versorgung_likes],
        xaxis: "x",
        y: [...Versorgung, ...Versorgung],
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
        x: [...Sport_Freizeit_one_negative, ...Sport_Freizeit_likes],
        xaxis: "x",
        y: [...Sport_Freizeit, ...Sport_Freizeit],
        yaxis: "y",
      },

      {
        alignmentgroup: true,

        legendgroup: "Sonstige",
        marker: { color: "#f9db95" },
        name: "Sonstige",
        offsetgroup: "Sonstige",
        orientation: "h",
        showlegend: false,
        textposition: "auto",
        type: "bar",
        x: [...Sonstige_one_negative, ...Sonstige_likes],
        xaxis: "x",
        y: [...Sonstige, ...Sonstige],
        yaxis: "y",
      },
    ];
    let layout = {
      annotations: [
        {
          x: 0,
          y: linelength + 1,
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
      //   autosize: true,
      height: plotheight,
      hovermode: false,
      margin: { b: 40, l: 110, r: 0, t: 30 },
      shapes: [
        {
          line: { color: "white", width: 2 },
          type: "line",
          x0: 0,
          x1: 0,
          y0: -0.5,
          y1: linelength,
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
        tickvals: [-500, -250, -100, -50, 0, 50, 100, 250, 500],
        ticktext: ["500", "250", "100", "50", "|", "50", "100", "250", "500"],
        linecolor: "white",
      },
      yaxis: {
        anchor: "x",
        fixedrange: true,
        categoryorder: "total ascending",
        tickcolor: "white",
        ticklen: 0,
        ticks: "outside",
        title: { text: "" },
        showgrid: false,
      },
      domain: [0.0, 1.0],
      //   title: {
      //     text: "Wünsche | Stimmen",
      //     xanchor: "center",
      //     x: 0.56,
      //     y: 0.97,
      //     font: {
      //       size: 15
      //     }
      //   }
    };

    let config = {
      showLink: false,
      displayModeBar: false,
    };

    return (
      <div className={classes.card}>
        <div className={classes.title}>Stadtteile</div>
        <div className={classes.subtitle}>
          Anhand der gesammelten Ideen und Votes kannst du die Relevanz der
          Themen innerhalb der Stadtteile erkennen und nach Themen filtern.
        </div>
        {themenfilter}
        <div className={classes.clickblocker}></div>
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

const mapStateToProps = (state) => ({ data: state.data });

export default connect(mapStateToProps)(withStyles(styles)(Stadtteil));
