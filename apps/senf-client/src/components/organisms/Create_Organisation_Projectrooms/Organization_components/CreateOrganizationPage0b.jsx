/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3, StyledText } from "../../../../styles/GlobalStyle";
import organizationTypes from "../../../../data/organizationTypes";

const CoverWrapper = styled.div`
  margin-left: 0%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px 20px;
  grid-template-areas:
    ". ."
    ". .";

  @media (min-width: 768px) {
    margin-left: 10%;
    width: 80%;
    padding-top: 20px;
  }
`;
const Covers = styled.div`
  width: 100%;
  height: 100%;

  z-index: 9;
  float: left;
  position: relative;
  animation: ${(props) => props.animation};
  overflow: hidden;
  border-radius: 25px;
  background-color: white;
  margin: 0;
  padding: 0;

  background-color: ${(props) =>
    props.selectedOrganization ? "#feecab" : "#fcfbf8"};
  border-radius: 18px;
  border: 2px solid
    ${(props) => (props.selectedOrganization ? "#e8ba02" : "#ffffff")};
  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
`;
const Icon = styled.div`
  width: 30%;
  height: 30%;

  margin: 45% 35% 25% 35%;
`;
const CoverTitle = styled.span`
  font-size: 15px;
  font-weight: 900;
  /* font-family: PlayfairDisplay-Bold; */
  color: #353535;
  text-align: center;
  width: 100%;
  position: absolute;
  top: 30px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const CreateOrganizationPage1 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);
  const [organizationType, setOrganizationType] = useState(null);

  const userId = useSelector((state) => state.user.userId);

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
        setOrganizationType(data.organizationType);
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      fetchData();
    }
  }, []);

  const handleNext = async () => {
    setNextClicked(true);
    const db = firebase.firestore();

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        organizationType: organizationType,
      };

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));

      return ref.update(updateProject).then(() => {
        setTimeout(() => {
          if (localStorage.getItem("createOrganizationPostEdit") === "true") {
            set(pagesData.length - 1);
          } else {
            onClickNext();
          }
        }, 200);
      });
    } else {
      //CREATING A NEW ORGANIZATION
      const newOrganization = {
        organizationType: organizationType,
        userIds: [userId],
        createdAt: new Date().toISOString(),
        status: "uncompleted",
      };

      const userRef = await db.collection("users").doc(userId);
      const organizatinRef = await db.collection("organizations");

      organizatinRef
        .add(newOrganization)
        .then((doc) => {
          localStorage.setItem("createOrganizationId", doc.id);

          userRef.update({
            organizationId: firebase.firestore.FieldValue.arrayUnion(doc.id),
          });
        })

        .then(() => {
          setTimeout(() => {
            onClickNext();
          }, 200);
        });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>

          <CoverWrapper>
            {organizationTypes.map(({ name, label, svgIcon }) => (
              <Covers
                animation="coverAnimation 0.5s ease-in-out"
                onClick={() => setOrganizationType(name)}
                selectedOrganization={organizationType === name}
              >
                <CoverTitle>{label}</CoverTitle>
                <Icon>{svgIcon}</Icon>
              </Covers>
            ))}
          </CoverWrapper>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        index={index}
        pagesData={pagesData}
        disabled={!organizationType || nextClicked}
        loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage1;
