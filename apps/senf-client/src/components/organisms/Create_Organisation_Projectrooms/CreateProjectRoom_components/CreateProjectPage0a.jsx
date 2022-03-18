/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
import { StyledH2, StyledH3, StyledImg } from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

const OrganizationCard = styled.div`
  height: 280px;
  width: 250px;
  background-color: #ffe898;
  position: relative;
  margin: 20px calc(50% - 125px);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  outline: ${(props) =>
    props.selectedOrganization ? "3px solid #353535 " : "3px solid white"};

  outline-offset: -3px;
`;
const ImgWrapper = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 100%;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
`;

const CreateProjectPage1 = ({ onClickNext }) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);
  const organizations = useSelector((state) => state.data.organizations);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);
  const [selectedOrganizationName, setSelectedOrganizationName] =
    useState(null);
  const [selectedOrganizationType, setSelectedOrganizationType] =
    useState(null);

  const myOrganizations = organizations.filter(({ organizationId }) =>
    organizationId.includes(organizationId)
  );

  const handleDropdown = (value) => {
    setSelectedOrganizationId(value);
    const selectedOrganizationName = myOrganizations.filter(
      ({ organizationId }) => value.includes(organizationId)
    );
    setSelectedOrganizationName(selectedOrganizationName[0].title);
    setSelectedOrganizationType(selectedOrganizationName[0].organizationType);
  };

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"))
        .get();

      if (!ref.exists) {
        console.log("No such document!");
      } else {
        const data = ref.data();
        setSelectedOrganizationId(data.owner);
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      fetchData();
    }
  }, []);

  const handleNext = async () => {
    setNextClicked(true);

    const db = firebase.firestore();

    //CREATING A NEW PROJECTROOM
    const newProject = {
      createdAt: new Date().toISOString(),
      owner: selectedOrganizationName,
      organizationId: selectedOrganizationId,
      organizationType: selectedOrganizationType,
      status: "uncompleted",
    };

    await db
      .collection("organizations")
      .doc(selectedOrganizationId)
      .collection("projectRooms")
      .add(newProject)
      .then((doc) => {
        doc.update({ projectRoomId: doc.id });
        localStorage.setItem(
          "createProjectRoomOrganizationId",
          selectedOrganizationId
        );
        localStorage.setItem("createProjectRoomId", doc.id);
      })

      .then(() => {
        setTimeout(() => {
          onClickNext();
        }, 200);
      });
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            Übersicht
          </StyledH2>
          <StyledH3 textAlign="center" margin="20px">
            Wähle einen passenden Projektnamen sowie eine
            Projektraumbeschreibung, die zum einen informiert und zum anderen
            auffordert Ideen beizutragen und sich einzubringen.
          </StyledH3>

          {myOrganizations.map((organization) => (
            <OrganizationCard
              onClick={() => handleDropdown(organization.organizationId)}
              selectedOrganization={
                organization.organizationId === selectedOrganizationId
              }
            >
              <ImgWrapper>
                <StyledImg src={organization.imgUrl} width="100%" />
              </ImgWrapper>
              <StyledH2 fontWeight="900" textAlign="center" margin="20px 0 0 0">
                {organization.title}
              </StyledH2>
            </OrganizationCard>
          ))}
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("lets_go")}
        handleNext={handleNext}
        disabled={!selectedOrganizationId || nextClicked}
        loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage1;
