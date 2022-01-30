import { isMobileCustom } from "apps/senf-client/src/util/customDeviceDetect";
import React, { useState, useEffect, useCallback } from "react";

const WaveCanvas = ({ canvasRef, props }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  // The scroll listener
  const handleScroll = useCallback(() => {
    const el = document.getElementById("ListWrapper");
    console.log(el?.scrollTop);
    setScrollPercentage(el?.scrollTop * -1);
    setScrollOpacity(1 - el?.scrollTop / 1000);
  }, []);

  // Attach the scroll listener to the div
  useEffect(() => {
    const div = document.getElementById("ListWrapper");
    div?.addEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return (
    <canvas
      id="wave"
      style={{
        transform: "rotate(-6deg) translateX(-50px)",
        display: "block",
        width: "600px",
        height: isMobileCustom
          ? `calc(100% - (100px + ${scrollPercentage}px))`
          : `calc(100% - (-0px + ${scrollPercentage}px))`,
        bottom: 0,
        position: "absolute",
        opacity: scrollOpacity,
        zIndex: -100,
      }}
      ref={canvasRef}
      {...props}
    />
  );
};

export default WaveCanvas;
