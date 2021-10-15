/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const NoMore = styled.div`
  color: rgb(87, 87, 87);
  position: absolute;
  font-size: 20pt;
  margin-top: 0vh;
  margin-left: 0vw;
  width: 100%;
  text-align: center;
  font-family: Playfair Display;
`;

const NoContent = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
  z-index: 10;
`;

export const NoMoreMainContent = ({ dataFinal }) => {
  const { t } = useTranslation();

  return dataFinal.length > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : (
    <NoContent>{t("noContentIdeas")}</NoContent>
  );
};

export const NoMoreMyContent = ({ dataFinal, myScreams, loading }) => {
  const { t } = useTranslation();

  return !loading && dataFinal.length > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : myScreams === undefined ? (
    <NoContent>
      Du hast bisher noch keine Idee geteilt. Es gibt noch so viele Ideen da
      draußen & du bist kreativ! Teile deine Ideen!
    </NoContent>
  ) : (
    <NoContent>
       Zu den ausgewählten Filtern hast du noch keine Ideen geteilt.
    </NoContent>
  );
};

export const NoMoreProjectsContent = ({ dataFinal, loading, project }) => {
  const { t } = useTranslation();

  return !loading && dataFinal.length > 0 ? (
    <NoMore>
      ... <br /> {t("noMoreIdeas")} <br />
    </NoMore>
  ) : !loading && dataFinal.length !== project.screams.length ? (
    <NoContent>{t("noContentIdeas")}</NoContent>
  ) : (
    <NoContent>
      Zu diesem Projektraum wurde bisher noch keine Idee geteilt. Sei die/der
      erste und teile deine Idee!
    </NoContent>
  );
};