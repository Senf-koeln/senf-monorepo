/** @format */

import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// Images
import WeblinkIcon from "../../../images/icons/weblink.png";
import contactIcon from "../../../images/icons/mail.png";
import { StyledH2, StyledText } from "../../../styles/GlobalStyle";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";

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
  pointer-events: all;
`;

const Content = styled.div`
  width: 100%;
  padding: 15px;
  object-fit: cover;
  font-size: 18, 666666666666664px !important;
  line-height: 22, 666666666666664px !important;
`;

const Button = styled.button`
  border-radius: 20px;
  text-transform: none;
  background-color: white;
  height: 40px;
  box-shadow: none;
  padding-right: 15px;
  padding-left: 15px;
  background-color: rgb(254, 217, 87);
  margin-right: 5px;
  box-shadow: rgb(38, 57, 77, 0) 0px 20px 30px -16px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ProjectInfo = ({
  description,
  weblink,
  contact,
  startDate,
  endDate,
  owner,
}) => {
  const openLink = (weblink) => {
    window.open(`https://${weblink}`, "_blank");
  };
  const openMail = (contact) => {
    window.location.href = "mailto:" + contact;
  };
  const { t } = useTranslation();
  return (
    <Card>
      <Content>
        <StyledH2 fontWeight="900"> {t("what_is_it_about")}</StyledH2>

        <StyledText>{description}</StyledText>

        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
        >
          {weblink && (
            <SubmitButton
              text={t("more_info")}
              zIndex="999"
              backgroundColor="#fed957"
              textColor="#353535"
              onClick={() => openLink(weblink)}
              shadow={false}
              smallSubmitButton={true}
              iconRight={true}
              name="Weblink"
              marginLeft="0"
              transformX="none"
              iconWidth="16px"
            />
          )}
          {contact && (
            <SubmitButton
              text={t("contact")}
              zIndex="999"
              backgroundColor="#fed957"
              textColor="#353535"
              onClick={() => openMail(contact)}
              shadow={false}
              smallSubmitButton={true}
              iconRight={true}
              name="Contact"
              marginLeft="10px"
              transformX="none"
              iconWidth="22px"
            />
          )}
        </div>

        <br />
        <StyledH2 fontWeight="900"> {t("period")} </StyledH2>
        <p>
          {endDate ? (
            <StyledText>
              {startDate} – {endDate}
            </StyledText>
          ) : (
            <StyledText>{startDate} </StyledText>
          )}
        </p>
        <br />

        <StyledH2 fontWeight="900">{t("Initiators")}</StyledH2>
        <StyledText>{owner}</StyledText>
        <br />
      </Content>
    </Card>
  );
};

export default ProjectInfo;
