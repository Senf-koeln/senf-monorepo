/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

// Redux stuff
import { closeScream } from "../../../redux/actions/screamActions";
import { clearErrors } from "../../../redux/actions/errorsActions";
import { setMapViewport } from "../../../redux/actions/mapActions";

//COMPONENTS
import ShareModal from "../../molecules/Modals/ShareModal";
import MenuModal from "../../molecules/Modals/MenuModal";
import Comments from "../../molecules/Cards/Comments";
import CommentForm from "../../atoms/Forms/CommentForm";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";

import ScreamDialogSwipe from "../../../hooks/ScreamDialogSwipe";
import Loader from "../../atoms/Animations/Loader";
import ShareYourOpinionCard from "../../molecules/Cards/ShareYourOpinionCard";
import IdeaCardBig from "../../molecules/Cards/IdeaCardBig";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../../atoms/Backgrounds/GradientBackgrounds";
import CommentMenuModal from "../../molecules/Modals/CommentMenuModal";

const portalRoot = document.getElementById("portal-root");

const ButtonsContainer = styled.div`
  width: 120px;
  height: 50px;
  margin-left: calc(100% - 120px);
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
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

const ScreamDialog = () => {
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
  const [commentFormShow, setCommentFormShow] = useState(false);

  useEffect(() => {
    if (openScream && lat !== undefined) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      if (!isMobileCustom) {
        setCommentFormShow(true);
      }
      setTimeout(() => {
        const viewport = {
          latitude: isMobileCustom && openScream ? lat - 0.0008 : lat,
          longitude: long,
          zoom: 16.5,
          transitionDuration: 4000,
          pitch: 30,
          bearing: 0,
        };
        dispatch(setMapViewport(viewport));
      }, 400);

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
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight / 2}px)`,
    overflow: "scroll",
    touchAction: "none",
  }));

  const bind = useDrag(
    ({ down, movement: [, my], offset: [, y] }) => {
      const el = document.querySelector(".screamDialogDrag");

      if (my < -50) {
        set({
          y: down ? my : 100,
          transform: !down ? `translateY(${-30}px)` : `translateY(${0}px)`,
          touchAction: "unset",
          overflow: "scroll",
        });
        setCommentFormShow(true);
      }
      if (el.scrollTop < 30 && my > 150) {
        set({
          y: down ? my : window.innerHeight - 120,
          transform: down
            ? `translateY(${0}px)`
            : `translateY(${window.innerHeight / 2}px)`,
          touchAction: "none",
          overflow: "scroll",
        });
      }

      set({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
        top: -window.innerHeight + 241,
        bottom: window.innerHeight - 120,
        left: 0,
        right: 0,
      },
    }
  );
  const content = (
    <div className="wrapperScreamDialog">
      {!loadingIdea ? (
        <React.Fragment>
          <ButtonsContainer>
            <CustomIconButton name="Share" handleButtonClick={handleShare} />
            <CustomIconButton
              name="Menu"
              iconWidth="70%"
              handleButtonClick={() => setMenuOpen(true)}
            />
          </ButtonsContainer>
          {isMobileCustom ? <BackgroundMobile /> : <BackgroundDesktop />}
          <IdeaCardBig setClicked={setClicked} />
          <VerticalLine />
          <ShareYourOpinionCard />
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
      ) : (
        <Loader />
      )}
    </div>
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

      {commentFormShow && <CommentForm screamId={screamId} clicked={clicked} />}
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

export default ScreamDialog;
