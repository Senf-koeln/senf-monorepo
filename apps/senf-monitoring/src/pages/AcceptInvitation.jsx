import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Box, Button } from "senf-atomic-design-system";
import styled from "styled-components";
import { auth, db } from "../firebase";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

export const AcceptInvitation = () => {
  const { t } = useTranslation();

  const organizationName = "Cologne city administration";
  const invitationDocId = "xyz";

  const handleUpdateDoc = async (invitationDocData, uid) => {
    const updateDocData = {
      role: invitationDocData.role,
    };
    const docRef = doc(db, `users/${uid}`);
    await updateDoc(docRef, updateDocData);

    //   const usersRef = collection(db, "users");
    //   const q = query(usersRef, where("userId", "==", uid));
    //   const querySnapshot = await getDocs(q);

    //   querySnapshot.forEach((doc) => {

    //     const userData = doc.data();
    //     userData.likes = [];
    //     userData.comments = [];

    //   });

    // window.history.pushState(null, null, "/");
  };
  const handleAcceptInvitation = async () => {
    const { uid } = auth.currentUser;
    try {
      const invitationDocRef = doc(db, `mail/${invitationDocId}`);
      const invitationDocSnapshot = await getDoc(invitationDocRef);
      const invitationDocData = invitationDocSnapshot.data();

      if (uid && invitationDocSnapshot.exists()) {
        handleUpdateDoc(invitationDocData, uid);
      } else {
        throw new Error("Invitation not found");
      }
    } catch (error) {
      throw new Error(error, "error in handleAcceptInvitation");
    }
  };

  return (
    <Wrapper>
      <Box
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="70%"
        flexDirection="column"
        gap="50px"
      >
        <Box maxWidth="400px">
          <Typography variant="h1" textAlign="center">
            You were invitited to join the team of "{organizationName}"
          </Typography>
        </Box>
        <Button
          onClick={handleAcceptInvitation}
          text={t("accept_invitation")}
        />
      </Box>
    </Wrapper>
  );
};
