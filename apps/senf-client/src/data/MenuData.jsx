/** @format */
import React from "react";
import List_grey from "../images/icons/list_grey.png";
import List_yellow from "../images/icons/list_yellow.png";

import LampIcon_grey from "../images/icons/lampIcon_grey.png";
import LampIcon_yellow from "../images/icons/lampIcon_yellow.png";

import { Translation } from "react-i18next";

export const MenuData = [
  {
    isSelectedIcon: LampIcon_grey,
    isNotSelectedIcon: LampIcon_yellow,
    text: (
      <Translation>
        {(t, { i18n }) => <span>{t("menuData_allIdeas")}</span>}
      </Translation>
    ),
  },
  {
    isSelectedIcon: List_grey,
    isNotSelectedIcon: List_yellow,
    text: (
      <Translation>
        {(t, { i18n }) => <span>{t("menuData_projectrooms")}</span>}
      </Translation>
    ),
  },

  {
    isSelectedIcon: List_grey,
    isNotSelectedIcon: List_yellow,
    text: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizations")}</span>}
      </Translation>
    ),
  },
  {
    isSelectedIcon: List_grey,
    isNotSelectedIcon: List_yellow,
    text: (
      <Translation>
        {(t, { i18n }) => <span>{t("menuData_insights")}</span>}
      </Translation>
    ),
  },
];
