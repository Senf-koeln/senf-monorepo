/** @format */

import React, { useState, useEffect, memo } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

// Redux stuff
import { closeScream } from "../../../redux/actions/screamActions";
import { clearErrors } from "../../../redux/actions/errorsActions";

// COMPONENTS
import ShareModal from "../../molecules/Modals/ShareModal";
import MenuModal from "../../molecules/Modals/MenuModal";
import Comments from "../../molecules/Cards/Comments";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";

import Loader from "../../atoms/Backgrounds/Loader";
import ShareYourOpinionCard from "../../molecules/Cards/ShareYourOpinionCard";
import IdeaCardBig from "../../molecules/Cards/IdeaCardBig";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import CommentMenuModal from "../../molecules/Modals/CommentMenuModal";

const portalRoot = document.getElementById("portal-root");

const Wrapper = styled.div`
  width: 100vw;
  margin-top: 0vh;
  margin-left: 0px;
  z-index: 97;
  top: 30px;
  position: absolute;
  overflow-y: hidden;
  overflow-x: hidden;
  overscroll-behavior: contain;
  min-height: 100%;

  @media (min-width: 768px) {
    margin-left: 200px;
    margin-top: 0px;
    width: 400px;
    overflow-y: scroll !important;
    z-index: 97;
    top: 0;
    height: 100vh;
    position: fixed;
    margin-top: 0vh;

    animation: enterScreamDialogAnimation 0.7s;

    @keyframes enterScreamDialogAnimation {
      0% {
        transform: translateY(50%);
        opacity: 0;
      }
      49% {
        transform: translateY(50%);
        opacity: 0;
      }

      50% {
        transform: translateY(50%);
        opacity: 1;
      }

      100% {
        transform: translateY(0%);
        opacity: 1;
      }
    }
  }
`;
const ButtonsContainer = styled.div`
  width: 120px;
  height: 50px;
  margin-left: calc(100% - 120px);
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 1;
`;
const VerticalLine = styled.div`
  width: 4px;
  position: relative;
  background-color: #414345;
  height: 10px;
  margin-left: -2px;
  left: 50%;
  z-index: 0;
`;

const IdeaDialog = () => {
  const { screamId, title, lat, long, userHandle, comments } = useSelector(
    (state) => state.data.scream
  );

  const dispatch = useDispatch();

  const openScream = useSelector((state) => state.UI.openScream);
  const loadingIdea = useSelector((state) => state.data.loadingIdea);

  const [path, setPath] = useState("");
  const [clicked, setClicked] = useState(false);

  const [shareOpen, setShareOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [commentMenuOpen, setCommentMenuOpen] = useState(false);
  const [userHandleSelected, setUserHandleSelected] = useState("");
  const [commentIdSelected, setCommentIdSelected] = useState("");
  const [swipePosition, setSwipePosition] = useState("bottom");

  // const prevLat = usePrevious({ lat });
  // const prevLong = usePrevious({ long });

  useEffect(() => {
    if (openScream && lat !== undefined) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      // if (
      //   (lat && prevLat && prevLat.lat !== lat) ||
      //   (long && prevLong && prevLong.long !== long)
      // ) {
      //   setTimeout(() => {
      //     const viewport = {
      //       latitude: isMobileCustom && openScream ? lat - 0.0008 : lat,
      //       longitude: long,
      //       zoom: 16.5,
      //       transitionDuration: 4000,
      //       pitch: 30,
      //       bearing: 0,
      //     };
      //     dispatch(setMapViewport(viewport));
      //   }, 200);
      // }

      setPath(`https://senf.koeln/${screamId}`);
    }
  }, [lat, loadingIdea, long, openScream, screamId]);

  const handleClose = () => {
    dispatch(closeScream());
    dispatch(clearErrors());
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Senf.koeln – ${title}`,
          url: path,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      setShareOpen(true);
    }
  };

  const [props, set] = useSpring(() => ({
    y: 0,
    transform: `translateY(${window.innerHeight / 2}px)`,
    overflow: "scroll",
    touchAction: "none",
  }));

  const bind = useDrag(
    ({ last, down, movement: [mx, my] }) => {
      const el = document.querySelector(".screamDialogDrag");

      if (last && my < -50 && swipePosition === "bottom") {
        set({
          transform: !down ? `translateY(${-30}px)` : `translateY(${0}px)`,
          touchAction: "unset",
          overflow: "scroll",
        });
        setSwipePosition("top");
      }
      if (last && el.scrollTop < 30 && my > 150) {
        set({
          transform: down
            ? `translateY(${0}px)`
            : `translateY(${window.innerHeight / 2}px)`,
          touchAction: "none",
          overflow: "scroll",
        });
        setSwipePosition("bottom");
      }
      if (swipePosition !== "top") {
        set({ y: down ? my : 0 });
      }

      if (last && mx > 100) {
        handleClose();
      }
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
        top: -window.innerHeight / 2,
        bottom: window.innerHeight - 120,
      },
    }
  );
  const content = (
    <Wrapper>
      {!loadingIdea && (
        <React.Fragment>
          <ButtonsContainer>
            <CustomIconButton name="Share" handleButtonClick={handleShare} />
            <CustomIconButton
              name="Menu"
              iconWidth="25px"
              handleButtonClick={() => setMenuOpen(true)}
            />
          </ButtonsContainer>
          <Background />

          <IdeaCardBig setClicked={setClicked} />
          <VerticalLine />
          <ShareYourOpinionCard screamId={screamId} clicked={clicked} />
          <Comments
            comments={comments}
            setCommentMenuOpen={setCommentMenuOpen}
            setUserHandleSelected={setUserHandleSelected}
            setCommentIdSelected={setCommentIdSelected}
          />
          {isMobileCustom ? (
            <div style={{ height: "200px" }} />
          ) : (
            <div style={{ height: "200px" }} />
          )}
        </React.Fragment>
      )}
    </Wrapper>
  );
  return ReactDOM.createPortal(
    <React.Fragment>
      {shareOpen && (
        <ShareModal
          screamId={screamId}
          title={title}
          path={path}
          setShareOpen={setShareOpen}
        />
      )}
      {menuOpen && (
        <MenuModal
          screamId={screamId}
          userHandle={userHandle}
          setMenuOpen={setMenuOpen}
        />
      )}

      {commentMenuOpen && (
        <CommentMenuModal
          commentId={commentIdSelected}
          setCommentMenuOpen={setCommentMenuOpen}
          screamId={screamId}
          userHandle={userHandleSelected}
        />
      )}

      <CustomIconButton
        name="ArrowLeft"
        position="fixed"
        margin="10px"
        marginLeft={document.body.clientWidth > 768 && "210px"}
        top="0px"
        zIndex="98"
        handleButtonClick={handleClose}
      />

      {isMobileCustom ? (
        <animated.div
          className={!loadingIdea ? "screamDialogDrag" : ""}
          {...bind()}
          style={props}
        >
          {content}
        </animated.div>
      ) : (
        <React.Fragment>{content}</React.Fragment>
      )}
    </React.Fragment>,
    portalRoot
  );
};

export default memo(IdeaDialog);
