/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//Components
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import {
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
  Title,
} from "../styles/sharedStyles";
import EditIcon from "../../../../images/icons/pen.png";
import CheckIcon from "../../../../images/icons/check.png";
import MissingIcon from "../../../../images/icons/close.png";
import ExpandButton from "../../../atoms/CustomButtons/ExpandButton";
import { set } from "lodash-es";
import {
  getProjects /* reloadProjects */,
} from "../../../../redux/actions/projectActions";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

import { getOrganizations } from "../../../../redux/actions/organizationActions";
import Switch from "../../../atoms/CustomButtons/Switch";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListItemWrapper = styled.div`
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: 2fr 2fr 2fr 2fr;
  gap: 10px 0px;
  grid-template-areas:
    ". ."
    ". ."
    ". ."
    ". .";
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: start;

  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ListItem = styled.div`
  height: 90px;
  width: 180px;
  max-width: 95%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: #fcfbf8;
  border-radius: 18px;
  border: 2px solid #ffffff;
  overflow: hidden;
`;

const ListItemTitle = styled.h3`
  margin-left: 20px;
  font-size: 18px;
`;
const ListItemStatus = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Divider = styled.div`
  width: 90%;
  height: 1px;
  background-color: rgba(186, 160, 79, 0.2);
  overflow: visible;
  margin: 10px 24px 10px 24px;
`;
const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;
const FlexWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const FrameWrapper = styled.div`
  width: calc(100vw - 50px);
  height: calc(100vh - 160px);
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.5);
  border: 10px solid white;
  max-width: 1200px;

  @media (min-width: 768px) {
    box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.2);

    width: calc(100vw - 60px);
    height: calc(100vh - 350px);
  }
`;

const CreateOrganizationPreview = ({
  onClickPrev,
  setClose,
  set,
  pagesData,
  listItems,
  index,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openPreview, setOpenPreview] = useState(false);
  const [status, setStatus] = useState(true);

  const [infosProvided, setInfosProvided] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"))
        .get();

      if (!ref.exists) {
        console.log("No such document!");
      } else {
        const data = ref.data();
        if (
          !data.status ||
          data.status === "deactivated" ||
          data.status === "uncompleted"
        ) {
          setStatus(false);
        }
        if (data.title && data.description) {
          setInfosProvided(true);
        }
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      fetchData();
    }
  }, []);

  const handleSwitch = () => {
    if (status === false) {
      handlePublish();
    } else {
      handleArchive();
    }
  };

  const handleArchive = async () => {
    const db = firebase.firestore();
    setStatus(false);

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));

      return ref.update({ status: "deactivated" }).then(() => {
        // dispatch(getProjects());
        // setClose();
        //REMOVE LOCALSTORAGE
        localStorage.removeItem("createOrganizationId");
      });
    } else {
    }
  };

  const handlePublish = async () => {
    const db = firebase.firestore();
    setStatus(true);

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));

      return ref.update({ status: "active" }).then(() => {
        // dispatch(getProjects());

        //REMOVE LOCALSTORAGE
        localStorage.removeItem("createOrganizationId");
        if (localStorage.getItem("createOrganizationPostEdit") !== "true") {
          setTimeout(() => {
            setClose();
          }, 1000);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            {pagesData[index].subTitle}
          </StyledH2>
          <ListItemWrapper>
            {listItems.map(({ title }, index) => (
              <ListItem>
                <ExpandButton handleButtonClick={() => set(index + 1)} />
                <StyledH3 textAlign="center">{title}</StyledH3>
              </ListItem>
            ))}
          </ListItemWrapper>
          {openPreview && (
            <FrameWrapper>
              <iframe
                src={`http://localhost:3000/projectrooms/${localStorage.getItem(
                  "createProjectRoomId"
                )}`}
                height="100%"
                width="100%"
                frameBorder="0"
              />
            </FrameWrapper>
          )}
          <br />
          <br />
          <br />

          {localStorage.getItem("createOrganizationPostEdit") === "true" && (
            <React.Fragment>
              <Divider />
              <br />
              <br />
              <br />
              <StyledH2 fontWeight="900" textAlign="center">
                Status des Organisationsprofils
              </StyledH2>
              <br />
              <SwitchWrapper>
                <Switch
                  id="deactivate-switch"
                  toggled={status}
                  onChange={handleSwitch}
                />
                <FlexWrapper>
                  <StyledH3
                    status={status}
                    fontWeight={700}
                    opacity={status !== true ? 1 : 0.4}
                  >
                    Deaktiviert
                  </StyledH3>
                  <StyledH3 fontWeight="400" margin="0px 20px">
                    {" "}
                     |
                  </StyledH3>
                  <StyledH3
                    status={status}
                    fontWeight={700}
                    opacity={status === true ? 1 : 0.4}
                  >
                    Öffentlich
                  </StyledH3>
                </FlexWrapper>
              </SwitchWrapper>
              <br />
            </React.Fragment>
          )}
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("Veröffentlichen")}
        prevLabel={t("back")}
        handleNext={handlePublish}
        handlePrev={onClickPrev}
        disabled={localStorage.getItem("createOrganizationPostEdit") === "true"}
        pagesData={pagesData}
        index={index}
        setClose={setClose}
        // loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPreview;