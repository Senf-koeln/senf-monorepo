/** @format */

import React from "react";

//Redux
import { useSelector } from "react-redux";

//Icons
import CircularProgress from "@material-ui/core/CircularProgress";
import lamploader from "../../../images/lamp.png";
import ChatBorder from "../../../images/icons/chat.png";
import HandFull from "../../../images/icons/handsFull.png";

const Keyindicators = () => {
  const { screams, likes, comments } = useSelector((state) => state.data);

  const Wishlength =
    screams.length === 0 ? (
      <div className="keyindicatorcard">
        <CircularProgress size={12} thickness={2} />
      </div>
    ) : (
      <div className="keyindicatorcard">
        <img
          src={lamploader}
          width="35px"
          style={{ transform: "rotate(35deg) translateY(-1px)" }}
          alt="lamploader"
        ></img>
        {screams.length} Ideen
      </div>
    );

  const Likeslength =
    likes.length === 0 ? (
      <div className="keyindicatorcard">
        <CircularProgress size={12} thickness={2} />
      </div>
    ) : (
      <div className="keyindicatorcard">
        <img src={HandFull} width="25px" alt="lamploader"></img>
        {"  "}
        {likes.length} Votes
      </div>
    );
  const Commentslength =
    comments.length === 0 ? (
      <div className="keyindicatorcard">
        <CircularProgress size={12} thickness={2} />
      </div>
    ) : (
      <div className="keyindicatorcard">
        <img src={ChatBorder} width="25px" alt="lamploader"></img>
        {comments.length} Kommentare
      </div>
    );

  return (
    <div className="analysewrapper">
      <div className="keyindicatorswrapper">
        {Wishlength}
        {Likeslength}
        {Commentslength}
      </div>
    </div>
  );
};

export default Keyindicators;
