/** @format */

import React, { Fragment, useEffect, useState } from "react";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setInfoPageOpen,
  setInfoPageClosed,
} from "../../../redux/actions/UiActions";
import { setCookies } from "../../../redux/actions/cookiesActions";

//LazyLoad
import { LazyImage } from "react-lazy-images";

import Headline from "../../../images/headline.png";
import FirstImageBad from "../../../images/bigbubblemanbad.png";

//IMAGES
import FirstImage from "../../../images/bigbubbleman.png";
import Mountain from "../../../images/bigbubblenew.png";

import { useTranslation, Trans } from "react-i18next";
import { isMobileCustom } from "../../../util/customDeviceDetect";

//Icons
import Info from "../../../images/icons/info.png";

import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import {
  CustomButton,
  CustomIconButton,
} from "../../atoms/CustomButtons/CustomButton";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { SideBarTabs } from "../../../styles/GlobalStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InlineInformationPageDesktop = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { cookie_settings } = useSelector((state) => state.data);
  const { loading, openInfoPage } = useSelector((state) => state.UI);

  const handleOpen = () => {
    dispatch(setInfoPageOpen());
  };

  const handleClose = () => {
    dispatch(setInfoPageClosed());
  };

  const handleCookies = (cookie_settings) => {
    dispatch(setCookies(cookie_settings));
  };
  const handleButtonContactClick = () => {
    var link = "mailto:dein@senf.koeln";
    window.location.href = link;
  };
  return (
    !isMobileCustom && (
      <Fragment>
        <SideBarTabs>
          <ExpandButton handleButtonClick={handleOpen} />
          <img src={Info} width="35" alt="EndImage" />
          <span className="inlineInfoIconText"> {t("info")}</span>
        </SideBarTabs>

        {!loading &&
        (cookie_settings === "all" || cookie_settings === "minimum") ? (
          <Dialog
            scroll={"paper"}
            open={openInfoPage}
            onClose={handleClose}
            className="dialogOverlayContent"
            TransitionComponent={Transition}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth={"lg"}
            PaperProps={{
              style: {
                borderRadius: "20px",
                width: "1000px",
                height: "900px",
                maxHeight: "calc(100vh - 80px)",
                overflowX: "hidden",
              },
            }}
          >
            <CustomIconButton
              name="Close"
              position="fixed"
              marginLeft="-100px"
              handleButtonClick={handleClose}
            ></CustomIconButton>

            <DialogContent style={{}}>
              <img className="Gib" src={Headline} width="100px"></img>
              {navigator.language !== "de-DE" && (
                <p className="explanation">
                  German expression saying – Contribute!
                </p>
              )}
              <LazyImage
                src={FirstImage}
                className="FirstImage"
                alt="Person_Senftube"
                placeholder={({ imageProps, ref }) => (
                  <img
                    ref={ref}
                    src={FirstImageBad}
                    className="FirstImage"
                    alt="Person_Senftube"
                  />
                )}
                actual={({ imageProps }) => (
                  <img {...imageProps} alt="Person_Senftube" />
                )}
              />
              <div className="SVGweb" alt="TopPath">
                <img src={Mountain} className="Mountain" alt="Mountain" />

                <div>
                  <span className="title1Web">
                    {t("infopage_block1_title")}
                  </span>
                  <span className="subTitle1Web">
                    {t("infopage_block1_subtitle")}
                  </span>
                </div>
                <span className="title2Web">{t("infopage_block2_title")}</span>
                <span className="subTitle2Web">
                  {t("infopage_block2_subtitle")}
                </span>
                <span className="title3Web">{t("infopage_block3_title")}</span>
                <span className="subTitle3Web">
                  {t("infopage_block3_subtitle")}
                </span>

                <CustomButton
                  text={t("showIdeas")}
                  backgroundColor="#353535"
                  textColor="white"
                  position="absolute"
                  top="2600px"
                  handleButtonClick={handleClose}
                />
                <CustomButton
                  text={t("contact")}
                  backgroundColor="white"
                  textColor="#353535"
                  position="absolute"
                  top="2660px"
                  handleButtonClick={handleButtonContactClick}
                />

                <span className="footer">
                  <Link to="/impressum">
                    <span className="impressum"> {t("imprint")}</span>
                  </Link>
                  <Link to="/datenschutz">
                    <span className="datenschutz">
                      {" "}
                      | {t("dataPrivacy")} |{" "}
                    </span>
                  </Link>
                  <Link to="/agb">
                    <span className="agb"> {t("termsAndConditions")} </span>
                  </Link>
                </span>
                <span className="footercopy">{t("infopage_illustrator")}</span>
              </div>
            </DialogContent>
          </Dialog>
        ) : !loading ? (
          <Dialog
            scroll={"paper"}
            open={openInfoPage}
            onClose={handleClose}
            className="dialogOverlayContent"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth={"sm"}
            PaperProps={{
              style: { borderRadius: "20px" },
            }}
          >
            <DialogContent style={{ height: "200px" }}>
              <div className="cookiesText">
                {" "}
                <span className="cookiesHeader">{t("cookiebanner_title")}</span>
                <br />
                <Trans i18nKey="cookiebanner_text">
                  Für die Bereitstellung einiger Funktionen und die Verbesserung
                  dieses Services brauchen wir Cookies. Falls du wirklich nur
                  die technisch notwendigsten Cookies akzeptieren willst, klicke{" "}
                  <span
                    className="Terms"
                    onClick={() => handleCookies("minimum")}
                  >
                    hier
                  </span>
                  &nbsp;oder konfiguriere deine{" "}
                  <span
                    className="Terms"
                    onClick={() => {
                      window.open("/cookieConfigurator", "_blank");
                    }}
                  >
                    Cookie-Einstellungen
                  </span>
                  .
                </Trans>
              </div>

              <CustomButton
                text={t("accept")}
                backgroundColor="#353535"
                textColor="white"
                position="relative"
                top="30px"
                handleButtonClick={() => handleCookies("all")}
              />
            </DialogContent>
          </Dialog>
        ) : null}
      </Fragment>
    )
  );
};

export default InlineInformationPageDesktop;
