/** @format */

import React, { Fragment, useState, useCallback, useRef } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useSpring } from "@react-spring/web";
import { useTranslation } from "react-i18next";
import MainDialog from "../../atoms/Layout/MainDialog";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

// Redux stuff
import { Link } from "react-router-dom";

//LazyLoad
import { LazyImage } from "react-lazy-images";

//IMAGES

import Insta from "../../../images/icons/socialmedia/insta.png";
import Facebook from "../../../images/icons/socialmedia/facebook.png";

import TopPath from "../../../images/topPathNew.png";
import First from "../../../images/first.png";
import Second from "../../../images/secondImage.png";
import Third from "../../../images/letstalkbubble.png";

//IMAGES BAD
import TopPathBad from "../../../images/toppathbad.png";
import FirstBad from "../../../images/firstbad.png";

//ICON TO OPEN THE INFOMENU
import CloseIcon from "../../../images/icons/close_yellow.png";

import Logo from "../../../images/logo.png";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MyButtonStyle from "../../atoms/CustomButtons/MyButtonStyle";
import MyButton from "../../../util/MyButton";
import Footer from "../../molecules/Footer/Footer";
import Headline from "./components/Headline";
import SecondHeadline from "./components/SecondHeadline";

import Bubble from "./components/Bubble";
import { useEffect } from "react";
import styled from "styled-components";
import Bulb from "./components/Bulb";
import Circle from "./components/Circle";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  position: fixed;
  background-color: white;
`;

const styles = {
  root: {
    backgroundColor: "white",
    padding: "0",
  },

  paper: {
    backgroundColor: "white",
    boxShadow: "none",
    padding: "0",
  },

  closeButton: {
    zIndex: 9999,
    position: "fixed",
    top: "0px",
    left: "15px",
    width: "40px",
    marginTop: "10px",
    color: "#ffd388",
    transform: "scale(1.5)",
  },

  nav: {
    width: "100vw",
    height: "80px",
    position: "fixed",
    backgroundColor: "white",
    zIndex: 98,
  },

  TopPath: {
    position: "absolute",
    top: "0",
    width: "100vw",
  },

  FirstImage: {
    position: "absolute",
    top: "24vw",
    width: "75vw",
    marginLeft: "15.3vw",
  },
};

const InlineInformationPage = ({ classes }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const handleButtonContactClick = () => {
    var link = "mailto:dein@senf.koeln";
    window.location.href = link;
  };

  useEffect(() => {
    const bubble = document.getElementById("Circle");
    // bubble.style.transform = "scale(0%)";
    bubble.style.clipPath = `circle(${0}% at 50% 50%)`;
  }, []);

  const [scrollValue, setScrollValue] = useState(0);
  const [visibleSecondHeadline, setVisibleSecondHeadline] = useState(false);

  // The scroll listener
  const handleScroll = useCallback(() => {
    const el = document.getElementById("InfoPage");
    const bubble = document.getElementById("Circle");

    let value = el?.scrollTop / 10;

    setScrollValue(value);
    // bubble.style.transform = `scale(${value / 8 + "%"}) translateY(${
    //   value / 5 + "px"
    // })`;

    bubble.style.clipPath = `circle(${value}% at 50% 50%)`;

    bubble.style.transformOrigin = "bottom";

    //  `;

    console.log(value);

    if (value > 30) {
      setVisibleSecondHeadline(true);
    } else {
      setVisibleSecondHeadline(false);
    }

    // console.log(el?.scrollTop);
    // setScrollValue(el?.scrollTop);
  }, []);

  useEffect(() => {
    const div = document.getElementById("InfoPage");
    div?.addEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // const ref = useRef(null);
  // const imgRef = useRef(null);
  // const matrix = useRef(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const Matrix = new DOMMatrix();
  //     matrix.current = Matrix;
  //     const div = document.getElementById("InfoPage");
  //     div?.addEventListener("scroll", onScroll);
  //   }
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  // const onScroll = () => {
  //   console.log(y, x);

  //   if (!ref.current && !matrix.current) return;

  //   const { innerHeight } = window;
  //   const refRect = ref.current.getBoundingClientRect();
  //   const imageRect = imgRef.current.getBoundingClientRect();

  //   const xMulitplier = imageRect.width / innerHeight;

  //   const x = Math.min(
  //     0,
  //     Math.max(-imageRect.width, xMulitplier * refRect.top)
  //   );
  //   const y =
  //     refRect.bottom < innerHeight
  //       ? Math.max(
  //           -innerHeight / xMulitplier,
  //           -1.5 * (innerHeight - refRect.bottom)
  //         )
  //       : 0;

  //   console.log(y, x);
  //   const position = matrix.current.translate(x, y, 0);
  //   imgRef.current.style.transform = position.toString();
  // };

  return (
    <Fragment>
      <ExpandButton
        handleButtonClick={() => setOpen(true)}
        dataCy="InlineInfo-button"
      />

      <MainDialog isOpen={true}>
        <Container id="InfoPage">
          {/* <MyButton
            onClick={() => setOpen(false)}
            btnClassName={classes.closeButton}
          >
            <img src={CloseIcon} width="20px" />
          </MyButton>
          <div className="logo1">
            <img src={Logo} width="100px" alt="logo1"></img>
          </div> */}

          <Headline />
          <Circle scrollValue={scrollValue} />
          <Bubble />
          <Bulb />
          <SecondHeadline visibleSecondHeadline={visibleSecondHeadline} />

          <Footer color="#353535" position="absolute" top="1850px" />
        </Container>
      </MainDialog>
    </Fragment>
  );
};

export default withStyles(styles)(InlineInformationPage);
