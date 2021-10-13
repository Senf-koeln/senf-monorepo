/** @format */

import { CircularProgress, TextField, Typography } from "@material-ui/core";
import React from "react";
import { isAndroid } from "react-device-detect";
import ResetPassword from "../../profile/ResetPassword";

const LoginFormComponent = ({
  loading,
  classes,
  email,
  password,

  errors,
  handleToggle,
  handleSubmitLogin,
  setEmail,
  setPassword,
}) => {
  return (
    <form noValidate onSubmit={handleSubmitLogin}>
      <div className={classes.textfields}>
        <div className={classes.smallText} onClick={() => handleToggle()}>
          Noch kein Mitglied? <span className="Terms">Registrieren</span>
        </div>
        <TextField
          id="outlined-name"
          name="email"
          type="email"
          label="E-Mail"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          data-cy="login-email"
          // helperText={errors.email}
          error={errors?.email ? true : false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>

        <TextField
          id="outlined-password-input"
          name="password"
          label="Passwort"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          className={classes.textField}
          data-cy="login-password"
          // helperText={errors.password}
          error={errors?.password ? true : false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>

        <br />

        <ResetPassword />

        {errors?.general && (
          <Typography className={classes.customError}>
            {errors.general}
          </Typography>
        )}
        {errors?.emailVerified && (
          <Typography className={classes.customError}>
            {errors.emailVerified}
          </Typography>
        )}
      </div>

      <div
        className={isAndroid ? "buttonSignWrapperAndroid" : "buttonSignWrapper"}
      >
        <button
          type="submit"
          className="buttonWide buttonSign"
          disabled={loading}
          data-cy="login-user"
        >
          Anmelden
          {loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
        </button>
      </div>
      <div
        className={
          isAndroid ? classes.smallText_fixed_android : classes.smallText_fixed
        }
        onClick={() => handleToggle()}
      >
        Noch kein Mitglied? <span className="Terms">Registrieren</span>
      </div>
    </form>
  );
};

export default LoginFormComponent;
