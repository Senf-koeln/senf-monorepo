/** @format */

import React from "react";

const Blank = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        top: 0,
        left: 0,
        position: "fixed",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "content",
        textAlign: "center",
      }}
    ></div>
  );
};

export default Blank;
