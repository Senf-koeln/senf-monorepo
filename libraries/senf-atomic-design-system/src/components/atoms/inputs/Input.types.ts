/** @format */

import { ChangeEventHandler } from "react";

export interface InputProps {
  id?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute | "textarea";
  label?: string;
  note?: string;
  icon?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  rows?: number;
  maxRows?: number;
  // value?: string; //! why are we passing value to input component?
  // setValue?: ChangeEventHandler<HTMLInputElement>;  //! why are we passing setValue to input component?
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: ChangeEventHandler<HTMLInputElement>;
  receiveValue: (value?: string) => void;
}
