/** @format */

import React, { useEffect } from "react";

import { isMobileCustom } from "../util/customDeviceDetect";

//FIREBASE
import { onAuthStateChanged, onIdTokenChanged, reload } from "firebase/auth";
import { auth } from "../firebase";
//REDUX STUFF
import { useSelector, useDispatch } from "react-redux";

//Icons
import CircularProgress from "@material-ui/core/CircularProgress";

//Images
import Celebrate from "../images/celebrateImage.png";
import Fast_geschafft from "../images/headlines/Fast_geschafft.png";

//COMPONENT
import LoginRegistration from "../components/organisms/Auth/LoginRegistration";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import { CustomIconButton } from "../components/atoms/CustomButtons/CustomButton";
import { useHistory } from "react-router-dom";
import { StyledH3 } from "../styles/GlobalStyle";
import styled from "styled-components";
import { SubmitButton } from "../components/atoms/CustomButtons/SubmitButton";
import { getUserData } from "../redux/actions/userActions";
import { SET_AUTHENTICATED } from "../redux/types";

const TextWrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 500px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 3vh;
  height: 100%;
`;
const styles = {
  question: {
    fontSize: "14pt",
    border: "1px #414345 solid",
    borderRadius: "100%",
    position: "fixed",
    bottom: "2vh",
    right: "2vh",
    zIndex: 99,
    width: "1.5em",
    height: "1.5em",
    lineHeight: "22pt",
    textAlign: "center",
  },
};

const Verification = ({ classes }) => {
  const loading = useSelector((state) => state.UI.loading);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    alert(
      "Abhängig davon, welchen E-Mail Dienstleister du nutzt, kann die Verifizierungs-E-Mail verzögert eintreffen. Falls wirklich keine E-Mail eintreffen sollte, bitte melde dich bei uns: dein@senf.koeln"
    );
  };

  const handleClose = () => {
    history.push("/");
  };

  useEffect(() => {
    onIdTokenChanged(auth, (user) => {
      if (user && user.uid && user.emailVerified) {
        dispatch({ type: SET_AUTHENTICATED });
        dispatch(getUserData(user.uid));
        // show banner in the main page that
        // the user has been automatically logged in
        //after verification
        // setautoLoggedin(true)
        history.push("/");
      }
    });
    let interval = setInterval(async () => {
      try {
        if (auth.currentUser) {
          await reload(auth.currentUser);
        }
      } catch (error) {
        console.log(error, "error in verification.jsx");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {!loading ? (
        <div>
          {!isMobileCustom && (
            <CustomIconButton
              name="Close"
              position="fixed"
              margin="40px"
              handleButtonClick={handleClose}
            />
          )}

          <img
            src={Fast_geschafft}
            className="VerifyHeader"
            alt="Fast_geschafft_headline"
          />
          <TextWrapper>
            <StyledH3 textAlign="center">
              Du bekommst in den nächsten Minuten von uns eine E-Mail. <br />{" "}
              &#40;
              {history.location.state && history.location.state.email}
              , evtl. im Junk-Ordner&#41; <br />
              <br /> Bitte öffne sie und klicke auf den Link um deinen Account
              zu verifizieren. Danach kannst du dich anmelden!
            </StyledH3>
          </TextWrapper>

          <SubmitButton
            text="Zur Anmeldung"
            backgroundColor="#353535"
            textColor="white"
            position="relative"
            top="20px"
            left="0"
            zIndex="0"
          />

          <LoginRegistration />

          <img src={Celebrate} className="CelebrateVerify" alt="EndImage" />

          <div className={classes.question} onClick={() => handleClick()}>
            ?
          </div>
        </div>
      ) : (
        <div className="white">
          <div className="spinnerDiv">
            <CircularProgress size={50} thickness={2} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(Verification);
