/** @format */

import React, { Component } from "react";
import axios from "axios";

//Extra-Packages
import ReactWordcloud from "react-wordcloud";

//MUI Stuff
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const options = {
  colors: [
    "rgb(180,217,204)",
    "rgb(137,192,182)",
    "rgb(99,166,160)",
    "rgb(68,140, 138)",
    "rgb(40,114,116)",
    "rgb(13,88,95)",
  ],
  enableTooltip: false,
  fontFamily: "Futura PT W01-Bold",
  fontSizes: [20, 30],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 0,
  rotations: 1,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};

export class Wordcloud extends Component {
  state = {
    bezirk: "3",

    wordcollections: [],
  };

  componentDidMount() {
    axios.get("/wordcloud").then((res) => {
      this.setState({ wordcollections: res.data });
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    let Words = [];
    const WordsArray = this.state.wordcollections;

    if (WordsArray !== undefined && WordsArray.length > 0) {
      WordsArray.forEach((element) => {
        Words.push(element.wordlist);
      });
    }

    let Words_new = [];
    const Words_new_array = Words[3];
    const Words_new_array_one = Words[0];
    const Words_new_array_two = Words[1];
    const Words_new_array_three = Words[2];
    const Words_new_array_four = Words[6];
    const Words_new_array_five = Words[4];
    const Words_new_array_six = Words[5];

    if (
      this.state.bezirk === "3" &&
      Words_new_array !== undefined &&
      Words_new_array.length > 0
    ) {
      Words_new_array.forEach((element) => {
        Words_new.push(element);
      });
    }
    if (
      //Rad
      this.state.bezirk === "0" &&
      Words_new_array_one !== undefined &&
      Words_new_array_one.length > 0
    ) {
      Words_new_array_one.forEach((element) => {
        Words_new.push(element);
      });
    }
    if (
      //Öpnv
      this.state.bezirk === "1" &&
      Words_new_array_two !== undefined &&
      Words_new_array_two.length > 0
    ) {
      Words_new_array_two.forEach((element) => {
        Words_new.push(element);
      });
    }

    if (
      //Verkehr
      this.state.bezirk === "2" &&
      Words_new_array_three !== undefined &&
      Words_new_array_three.length > 0
    ) {
      Words_new_array_three.forEach((element) => {
        Words_new.push(element);
      });
    }
    if (
      //umwelt
      this.state.bezirk === "6" &&
      Words_new_array_four !== undefined &&
      Words_new_array_four.length > 0
    ) {
      Words_new_array_four.forEach((element) => {
        Words_new.push(element);
      });
    }
    if (
      // Parkpltätze
      this.state.bezirk === "4" &&
      Words_new_array_five !== undefined &&
      Words_new_array_five.length > 0
    ) {
      Words_new_array_five.forEach((element) => {
        Words_new.push(element);
      });
    }
    if (
      // Sport / Freizeit
      this.state.bezirk === "5" &&
      Words_new_array_six !== undefined &&
      Words_new_array_six.length > 0
    ) {
      Words_new_array_six.forEach((element) => {
        Words_new.push(element);
      });
    }

    return (
      <div className={classes.card}>
        <div className={classes.title}>Top Keywords</div>
        <div className={classes.subtitle}>
          Die Keywords geben einen schnellen Einblick in die Gesprächsthemen.
          Umso mehr Ideen geteilt werden, desto aussagekräftiger werden diese
          Einblicke.
        </div>

        <FormControl variant="outlined" className={classes.textField}>
          <InputLabel
            margin="dense"
            htmlFor="outlined-age-native-simple"
          ></InputLabel>
          <Select
            native
            margin="dense"
            value={this.state.bezirk}
            onChange={this.handleChange}
            label="Geschlecht"
            id="standard-textarea"
            inputProps={{
              name: "bezirk",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="Alle Themen" value={3}>
              Alle Themen
            </option>
            <option value={0}>Rad</option>
            <option value={1}>Inklusion / Soziales</option>
            <option value={2}>Verkehr</option>
            <option value={6}>Umwelt und Grün</option>
            <option value={4}>Versorgung</option>
            <option value={5}>Sport / Freizeit</option>
          </Select>
        </FormControl>
        <div className={classes.wordcloud}>
          <ReactWordcloud options={options} words={Words_new} />
        </div>
      </div>
    );
  }
}

export default Wordcloud;
