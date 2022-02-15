import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  position: relative;
  margin-top: 5px;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const InputField = styled.input`
  background-color: white;
  outline: none;
  padding: 14px;
  border-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
  border-width: 1px;
  font-size: 16px;
  text-align: left;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
  :-ms-input-placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
  &:focus {
    border: 1px solid rgb(254, 217, 87);
  }
`;

const StyledHelperText = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  color: #f44336;
  border-radius: 0 0 10px 10px;
  height: 25px;
  margin-top: -6px;
  padding-top: 5px;
  padding-left: 15px;
  margin-bottom: 10px;
`;
export function Input({
  name,
  type,
  placeholder,
  onChange,
  value,
  error,
  helperText,
}) {
  return (
    <InputGroup>
      <InputField
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        error={error}
      />

      {error && <StyledHelperText>{helperText}</StyledHelperText>}
    </InputGroup>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "email"]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};
export default Input;
