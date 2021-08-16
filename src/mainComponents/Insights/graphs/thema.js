/** @format */

import React, { Component } from "react";

//Redux
import { useSelector } from "react-redux";

//Graphs
import createPlotlyComponent from "react-plotlyjs";
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from "plotly.js/dist/plotly-cartesian";
const PlotlyComponent = createPlotlyComponent(Plotly);

const Thema = () => {
  const { screams } = useSelector((state) => state.data);

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

  const Thema_nach_wunsch_array = screams;
  if (
    Thema_nach_wunsch_array !== undefined &&
    Thema_nach_wunsch_array.length > 0
  ) {
    Thema_nach_wunsch_array.forEach((element) => {
      if (element.Thema === "Rad") {
        Rad.push(element.likeCount);
      }
      if (element.Thema === "Inklusion / Soziales") {
        Inklusion_Soziales.push(element.likeCount);
      }
      if (element.Thema === "Verkehr") {
        Verkehr.push(element.likeCount);
      }

      if (element.Thema === "Umwelt und Grün") {
        Umwelt.push(element.likeCount);
      }
      if (element.Thema === "Versorgung") {
        Versorgung.push(element.likeCount);
      }
      if (element.Thema === "Sport / Freizeit") {
        Sport_Freizeit.push(element.likeCount);
      }
      if (element.Thema === "Sonstige") {
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
      // hovertemplate:
      //   "<b>%{hovertext}</b><br><br>thema=%{y}<br>Wunsch=%{x}<extra></extra>",
      // hovertext: [
      //   "Tische und Bänke für unsere Nachbarschaftswiese",
      //   "Verwildernde Betonflächen im Park",
      //   "Licht  in der Dunkelheit!",
      //   "Bäume statt Kies"
      // ],
      // alignmentgroup: true,
      //legendgroup: "Rad",
      // name: "ÖPNV",
      // offsetgroup: "ÖPNV",

      hovermode: false,
      clickmode: "event+select",
      marker: {
        color: "#929df6",
        line: { color: "white", width: 1.5 },
      },

      orientation: "h",
      showlegend: false,
      text: [Rad.length, sum(Rad)],
      mode: "markers+text",
      texttemplate: "%{text}",
      textposition: "inside",
      type: "bar",
      x: [-Rad.length, sum(Rad)],
      xaxis: "x",
      y: ["Rad", "Rad"],
      yaxis: "y",
    },
    {
      marker: { color: "#91dff4", line: { color: "white", width: 1.5 } },
      orientation: "h",
      showlegend: false,
      text: [Verkehr.length, sum(Verkehr)],
      mode: "markers+text",
      texttemplate: "%{text}",
      textposition: "inside",
      type: "bar",
      x: [-Verkehr.length, sum(Verkehr)],
      entry: [-Verkehr.length, sum(Verkehr)],
      xaxis: "x",
      y: ["Verkehr", "Verkehr"],
      yaxis: "y",
    },
    {
      marker: { color: "#8dd9b8", line: { color: "white", width: 1.5 } },
      orientation: "h",
      text: [Umwelt.length, sum(Umwelt)],
      mode: "markers+text",
      texttemplate: "%{text}",
      textposition: "inside",
      showlegend: false,
      type: "bar",
      x: [-Umwelt.length, sum(Umwelt)],
      xaxis: "x",
      y: ["Umwelt und Grün", "Umwelt und Grün"],
      yaxis: "y",
    },
    {
      marker: { color: "#e8907e", line: { color: "white", width: 1.5 } },
      orientation: "h",
      text: [Inklusion_Soziales.length, sum(Inklusion_Soziales)],
      mode: "markers+text",
      texttemplate: "%{text}",
      textposition: "inside",
      showlegend: false,
      type: "bar",
      x: [-Inklusion_Soziales.length, sum(Inklusion_Soziales)],
      xaxis: "x",
      y: ["Inklusion / Soziales", "Inklusion / Soziales"],
      yaxis: "y",
    },
    {
      marker: { color: "#bd98f6", line: { color: "white", width: 1.5 } },
      orientation: "h",
      text: [Versorgung.length, sum(Versorgung)],
      mode: "markers+text",
      texttemplate: "%{text}",
      textposition: "inside",
      showlegend: false,
      type: "bar",
      x: [-Versorgung.length, sum(Versorgung)],
      xaxis: "x",
      y: ["Versorgung", "Versorgung"],
      yaxis: "y",
    },
    {
      marker: { color: "#f6c095", line: { color: "white", width: 1.5 } },
      orientation: "h",
      text: [Sport_Freizeit.length, sum(Sport_Freizeit)],
      mode: "markers+text",
      texttemplate: "%{text}",
      textposition: "inside",
      showlegend: false,
      type: "bar",
      x: [-Sport_Freizeit.length, sum(Sport_Freizeit)],
      xaxis: "x",
      y: ["Sport / Freizeit", "Sport / Freizeit"],
      yaxis: "y",
    },
    {
      marker: { color: "#f9db95", line: { color: "white", width: 1.5 } },
      orientation: "h",
      text: [SonstigeLength, sum(Sonstige)],
      mode: "markers+text",
      texttemplate: "%{text}",
      textposition: "inside",
      showlegend: false,
      type: "bar",
      x: [-SonstigeLength, sum(Sonstige)],
      xaxis: "x",
      y: [Sonstige_text],
      yaxis: "y",
    },
  ];
  let layout = {
    barmode: "relative",
    font: { color: "#414345", family: "Futura PT W01 Book", size: 14 },
    //   autosize: true,
    height: 300,
    hovermode: false,
    legend: { title: { text: "Thema" }, tracegroupgap: 0 },
    margin: { b: 40, l: 125, r: 0, t: 20 },

    //   margin: { t: 60 },
    template: "...",
    //   shapes: [
    //     {
    //       line: { color: "white", width: 2 },
    //       type: "line",
    //       x0: 0,
    //       x1: 0,
    //       y0: -0.5,
    //       y1: 6.5
    //     }
    //   ],
    xaxis: {
      anchor: "x",
      fixedrange: true,
      domain: [0.0, 1.0],
      dtick: 5,
      autorange: true,
      tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
      tickvals: [-500, -250, -100, -50, 0, 50, 100, 250, 500],
      ticktext: ["500", "250", "100", "50", "|", "50", "100", "250", "500"],
      tick0: 0,
      title: {
        text: "",
        y: 1,
        x: -0.5,
      },

      showgrid: false,
      zeroline: false,
      showline: false,
      linewidth: 2,
      linecolor: "white",
      // nticks: 0,
      // zerolinecolor: "green",
      // zerolinewidth: 4
    },
    yaxis: {
      anchor: "x",

      fixedrange: true,
      categoryorder: "max ascending",
      tickcolor: "white",
      ticklen: 0,
      ticks: "outside",
      title: { text: "" },
      showgrid: false,
    },
    annotations: [
      {
        x: 0,
        y: 6 + Sonstigetrue,
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
    domain: [0.0, 1.0],
  };

  let config = {
    showLink: false,
    displayModeBar: false,
  };

  return (
    <div className="insights-card">
      <div className="insights-card-title">Themen</div>
      <div className="insights-card-subtitle">
        Anhand der gesammelten Ideen und Votes, kannst du die Relevanz der
        Themen erkennen.
      </div>
      <div className="insights-plot-clickblocker"></div>
      <PlotlyComponent
        className="insights-plot"
        data={data}
        layout={layout}
        config={config}
      />
    </div>
  );
};

export default Thema;
