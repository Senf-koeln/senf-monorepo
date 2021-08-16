/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const styles = {};

const AllCheckbox = withStyles({
  root: {
    color: "#000000",
    lineHeight: "10pt",
    "&$checked": {
      color: "#000000",
      fontFamily: "Futura PT W01-Bold",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlueCheckbox = withStyles({})((props) => (
  <Checkbox color="default" style={{ color: "#929df6" }} {...props} />
));

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

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0)",
        },
        "&&&&:after": {
          borderBottom: "1px solid rgba(255, 255, 255, 0)",
        },
      },
    },
    MuiNativeSelect: {
      icon: {
        opacity: 0,
      },
    },
  },
});

export class Themenfilter extends Component {
  render() {
    const {
      handleLegend,
      handleLegend1,
      handleLegend2,
      handleLegend3,
      handleLegend4,
      handleLegend5,
      handleLegend6,
      handleLegend7,
      checked,
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7,
    } = this.props;

    //
    return (
      <div className="legendwrapper">
        {/* <div className="Filterheader"> Filter</div> */}
        <FormGroup row className="legend">
          <FormControlLabel
            control={
              <AllCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => handleLegend(1)}
                checked={checked === 1}
              />
            }
            label="Alle Themen"
          />
          <FormControlLabel
            control={
              <PurpleCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => handleLegend5("Versorgung")}
                checked={checked5 === "Versorgung"}
              />
            }
            label="Versorgung"
          />

          <FormControlLabel
            control={
              <LightblueCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => handleLegend3("Verkehr")}
                checked={checked3 === "Verkehr"}
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
                onChange={() => handleLegend4("Umwelt und Grün")}
                checked={checked4 === "Umwelt und Grün"}
              />
            }
            label="Umwelt und Grün"
          />

          <FormControlLabel
            control={
              <BlueCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => handleLegend1("Rad")}
                checked={checked1 === "Rad"}
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
                onChange={() => handleLegend2("Inklusion / Soziales")}
                checked={checked2 === "Inklusion / Soziales"}
              />
            }
            label="Inklusion / Soziales"
          />
          <FormControlLabel
            control={
              <OrangeCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => handleLegend6("Sport / Freizeit")}
                checked={checked6 === "Sport / Freizeit"}
              />
            }
            label="Sport / Freizeit"
          />
          <FormControlLabel
            control={
              <YewllowCheckbox
                icon={<FiberManualRecordIcon />}
                checkedIcon={
                  <FiberManualRecordIcon className="activelegenditem" />
                }
                onChange={() => handleLegend7("Sonstige")}
                checked={checked7 === "Sonstige"}
              />
            }
            label="Sonstige"
          />
        </FormGroup>
      </div>
    );
  }
}
Themenfilter.propTypes = {};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Themenfilter));
