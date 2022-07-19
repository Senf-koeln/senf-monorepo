/** @format */

import React, { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../atoms/buttons/Button";
import Box from "../../atoms/box/Box";
import Form from "../../molecules/form/Form";
import { AuthEmailProps } from "./AuthEmail.types";

import Typography from "../../atoms/typography/Typography";
import { openLink } from "../../../util/helpers";
import Dropdown from "../../atoms/dropdown/Dropdown";
import theme from "../../../styles/theme";
import TertiaryButton from "../../atoms/buttons/TertiaryButton";

const AuthEmail: FC<AuthEmailProps> = ({
  variant,
  loading,
  handleSubmitRegister,
  handleSubmitLogin,
  errorMessage,
  setPage,
}) => {
  const { t } = useTranslation();

  const [variantState, setVariantState] = useState("login");

  useEffect(() => {
    if (variant === "register") {
      setVariantState("register");
    }
  }, [variant]);

  const inputItemsLogin = [
    {
      name: "email",
      type: "email",
      placeholder: "E-Mail",
      autoComplete: "email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      autoComplete: "current-password",
    },
  ];

  const inputItemsRegister = [
    { name: "email", type: "email", placeholder: "E-Mail" },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
    {
      name: "handle",
      type: "text",
      placeholder: "Username",
    },
  ];

  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .required(t("enter_email"))
      .email(t("enter_valid_email")),

    password: yup.string().required(t("enter_password")),
  });
  const registerValidationSchema = yup.object({
    email: yup
      .string()
      .required(t("enter_email"))
      .email(t("enter_valid_email")),

    password: yup
      .string()
      .required(t("enter_password"))
      .min(8, t("password_8characters"))
      .matches(/\d+/, t("password_with_number")),

    confirmPassword: yup
      .string()
      .required(t("confirmPassword"))
      .oneOf([yup.ref("password"), null], t("passwords_must_match")),
    handle: yup
      .string()
      .required(t("enter_username"))
      .min(3, t("username_too_short"))
      .max(20, t("username_too_long"))
      .matches(/^\S*$/, t("spaces_username"))
      .matches(/^[a-zA-Z0-9\-\_\.]*$/, t("username_latin_only")),
  });

  const formikLoginStore = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const formikRegisterStore = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
    },
    validationSchema: registerValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => console.log("values"),
  });

  return (
    <Box
      flexDirection="column"
      margin="180px 10% 50px 10%"
      position="relative"
      zIndex={9999}
    >
      <Typography variant="h1" style={{ position: "relative" }}>
        {t("infopage_addMustard_1")}
      </Typography>
      <Typography variant="h1" style={{ position: "relative" }}>
        {t("infopage_addMustard_2")}
      </Typography>

      <Box margin="25px 0px 24px 0px" alignItems="center" gap="5px">
        {variantState === "login" ? (
          <React.Fragment>
            <Typography variant="bodyBg" style={{ position: "relative" }}>
              {t("auth_login_user_redirection_question")}
            </Typography>{" "}
            <TertiaryButton
              text={t("register_now")}
              onClick={() => setVariantState("register")}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="bodyBg" style={{ position: "relative" }}>
              {t("auth_register_user_redirection_question")}
            </Typography>
            <TertiaryButton
              text={t("login_now")}
              onClick={() => setVariantState("login")}
            />
          </React.Fragment>
        )}
      </Box>

      <Box gap="16px" flexDirection="column">
        <Form
          width="100%"
          inputItems={
            variantState === "register" ? inputItemsRegister : inputItemsLogin
          }
          formik={
            variantState === "register" ? formikRegisterStore : formikLoginStore
          }
        />

        {errorMessage && (
          <Typography variant="bodySm" color={theme.colors.signal.redDark}>
            {errorMessage.message}
          </Typography>
        )}
      </Box>

      <Box
        flexDirection="row"
        gap="5px"
        alignItems="center"
        margin="14px 0 36px 0"
      >
        {variantState === "login" ? (
          <React.Fragment>
            <p style={{ position: "relative" }}> {t("forgot_password")}</p>{" "}
            <TertiaryButton
              text={t("reset")}
              onClick={() => setPage("authResetEmail")}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="bodySm" style={{ position: "relative" }}>
              <Trans i18nKey="register_agb">
                ...
                <span
                  style={{ textDecoration: "underline" }}
                  onClick={() => openLink("senf.koeln/agb")}
                >
                  ...
                </span>
                ...
                <span
                  style={{ textDecoration: "underline" }}
                  onClick={() => openLink("senf.koeln/datenschutz")}
                >
                  ...
                </span>
                ...
              </Trans>
            </Typography>
          </React.Fragment>
        )}
      </Box>
      <Button
        variant="white"
        fillWidth="max"
        text={variantState === "register" ? t("register") : t("login")}
        loading={loading}
        onClick={
          variantState === "register"
            ? () => handleSubmitRegister(formikRegisterStore)
            : async (e) => {
                e.preventDefault();
                await handleSubmitLogin(formikLoginStore);
              }
        }
        disabled={
          variantState === "register"
            ? !formikRegisterStore?.isValid
            : !formikLoginStore?.isValid
        }
      />
    </Box>
  );
};

export default AuthEmail;
