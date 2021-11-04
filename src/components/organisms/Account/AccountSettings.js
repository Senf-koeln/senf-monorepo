/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../../../redux/actions/userActions";
import { StyledText } from "../../../styles/GlobalStyle";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";

const Card = styled.div`
  z-index: 99;
  position: relative;
  display: flex;
  margin-top: 0px;
  margin-left: 2.5%;
  width: 95%;
  min-width: 95%;
  border-radius: 20px;
  height: auto;
  background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0);
  margin-bottom: 10px;
`;

const Content = styled.div`
  width: 100%;
  padding: 15px;
  object-fit: cover;
  text-align: center;
`;

const AccountSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const deleteAccount = () => {
    const userHandle = this.props.user.handle;

    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Bitte um Account-loeschung") +
      "&body=" +
      escape(
        "Bitte loeschen Sie meinen Account." +
          "\n" +
          "\n" +
          "Mein Nutzername lautet:" +
          "\n" +
          "\n" +
          userHandle
      );
    window.location.href = link;
  };
  return (
    <React.Fragment>
      <Card>
        <Content>
          <StyledText>
            {t("account_contact")}
            <br />
            <br />
            {t("your")} Senf.koeln-Team
            <br />
          </StyledText>
        </Content>
      </Card>

      <CustomButton
        text={t("logout")}
        backgroundColor="white"
        textColor="#353535"
        handleButtonClick={handleLogout}
      />

      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "50px",
          textDecoration: "underline",
          position: "relative",
        }}
        onClick={deleteAccount}
      >
        {t("deteleAccount")}{" "}
      </div>
    </React.Fragment>
  );
};

export default AccountSettings;
