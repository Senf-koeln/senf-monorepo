/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { deleteScream } from "../../../redux/actions/screamActions";
import EditModal from "./EditModal";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MainModal from "./MainModal";
import AdminEditModal from "./AdminEditModal";

const ButtonWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.standalone ? "100px" : "50px")};
  position: relative;
  z-index: 999;
  overflow: hidden;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: grey;
  position: relative;
`;
const MenuModal = ({ setMenuOpen, screamId, userHandle }) => {
  const { authenticated, handle, isAdmin, isModerator } = useSelector(
    (state) => state.user
  );

  const { scream } = useSelector((state) => state.data);
  const [editOpen, setEditOpen] = useState(false);
  const [adminEditOpen, setAdminEditOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const deleteTheScream = () => {
    var answer = window.confirm(
      "Bist du sicher, dass du die Idee löschen möchtest?"
    );
    if (answer) {
      dispatch(deleteScream(screamId, history));

      //some code
    } else {
      //some code
    }
  };

  const reportScream = () => {
    const thisPath = `/users/${userHandle}/scream/${screamId}`;
    const siteLink = "senf.koeln" + thisPath;

    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Meldung: Beitrag beinhaltet unangebrachten Inhalt ") +
      "&body=" +
      escape(
        "Dieser Beitrag beinhaltet unangebrachten Inhalt:" +
          "\n" +
          "\n" +
          siteLink
      );
    window.location.href = link;
  };

  return (
    <React.Fragment>
      {editOpen && (
        <EditModal
          scream={scream}
          setEditOpen={setEditOpen}
          setMenuOpen={setMenuOpen}
        />
      )}

      {adminEditOpen && (
        <AdminEditModal
          scream={scream}
          isAdmin={isAdmin && true}
          setAdminEditOpen={setAdminEditOpen}
        />
      )}

      {!editOpen && !adminEditOpen && (
        <MainModal handleButtonClick={() => setMenuOpen(false)}>
          {authenticated && (isAdmin === true || isModerator === true) && (
            <React.Fragment>
              <ButtonWrapper>
                <ExpandButton handleButtonClick={() => setAdminEditOpen(true)}>
                  Idee bearbeiten (Admin)
                </ExpandButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <ExpandButton handleButtonClick={deleteTheScream}>
                  Idee löschen (Admin)
                </ExpandButton>
              </ButtonWrapper>
            </React.Fragment>
          )}
          {authenticated && userHandle === handle && (
            <React.Fragment>
              <ButtonWrapper>
                <ExpandButton handleButtonClick={() => setEditOpen(true)}>
                  Idee bearbeiten
                </ExpandButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <ExpandButton handleButtonClick={deleteTheScream}>
                  Idee löschen
                </ExpandButton>
              </ButtonWrapper>
            </React.Fragment>
          )}

          <ButtonWrapper
            standalone={
              (authenticated && userHandle === handle) || isAdmin || isModerator
                ? false
                : true
            }
          >
            <ExpandButton handleButtonClick={reportScream}>Melden</ExpandButton>
          </ButtonWrapper>
          <Line />
          <ButtonWrapper>
            <ExpandButton handleButtonClick={() => setMenuOpen(false)}>
              Abbrechen
            </ExpandButton>
          </ButtonWrapper>
        </MainModal>
      )}
    </React.Fragment>
  );
};

export default MenuModal;
