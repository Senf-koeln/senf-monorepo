/** @format */

import React from "react";
import styled, { css, keyframes } from "styled-components";
import CloseIcon from "../../../images/icons/close.png";
import ArrowLeftIcon from "../../../images/icons/arrow-left.png";
import ArrowRightIcon from "../../../images/icons/arrow-right.png";
import CircularArrowIcon from "../../../images/icons/circular-arrow.png";
import ShareIcon from "../../../images/icons/share.png";
import MenuIcon from "../../../images/icons/menu.png";
import HandsFullIcon from "../../../images/icons/handsFull.png";
import HandsnoclapIcon from "../../../images/icons/handsnoclap.png";
import ChatIconIcon from "../../../images/icons/chat.png";
import WeblinkIcon from "../../../images/icons/world-wide-web-on-grid.png";
import ContactIcon from "../../../images/icons/mail.png";
import DatePickerIcon from "../../../images/icons/datepicker.png";
import CheckIcon from "../../../images/icons/check.png";
import TrashIcon from "../../../images/icons/trash.png";

const enterAnimation = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.7) translateX(-50%);
    }
  
    80% {
      opacity: 0;
      transform: scale(0.7) translateX(-50%);
    }
  
    90% {
      opacity: 1;
      transform: scale(1.1) translateX(-50%);
    }
  
    100% {
      opacity: 1;
      transform: scale(1) translateX(-50%);
    }
    `;

const WideButton = styled.button`
  border-radius: 30px;
  text-transform: none;
  white-space: nowrap;
  height: 50px;
  box-shadow: rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;
  padding-left: 30px;
  padding-right: 30px;
  min-width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: translateX(-50%);
  overflow: hidden;

  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : "50%")};

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  bottom: ${(props) => props.bottom && props.bottom};
  top: ${(props) => props.top && props.top};
  left: ${(props) => props.left && props.left};

  position: ${(props) => props.position};
  z-index: ${(props) => props.zIndex};
  animation: ${(props) =>
    props.animation &&
    css`
      ${enterAnimation} 2s
    `};

  &:hover {
    filter: brightness(95%);
  }
`;

export const CustomButton = ({
  text,
  backgroundColor,
  textColor,
  position,
  bottom,
  top,
  left,
  marginLeft,
  zIndex,
  animation,
  handleButtonClick,
  children,
}) => {
  return (
    <WideButton
      onClick={handleButtonClick}
      backgroundColor={backgroundColor}
      textColor={textColor}
      position={position}
      bottom={bottom}
      top={top}
      left={left}
      marginLeft={marginLeft}
      zIndex={zIndex}
      animation={animation}
    >
      {text}
      {children}
    </WideButton>
  );
};

const Icons = {
  Close: CloseIcon,
  ArrowLeft: ArrowLeftIcon,
  ArrowRight: ArrowRightIcon,

  CircularArrow: CircularArrowIcon,
  Share: ShareIcon,
  Menu: MenuIcon,
  HandsFull: HandsFullIcon,
  Handsnoclap: HandsnoclapIcon,
  Chat: ChatIconIcon,
  Weblink: WeblinkIcon,
  Contact: ContactIcon,
  DatePicker: DatePickerIcon,
  Check: CheckIcon,
  Trash: TrashIcon,
};

const enterAnimationRound = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.7) 
    }
  
    80% {
      opacity: 0;
      transform: scale(0.7)
    }
  
    90% {
      opacity: 1;
      transform: scale(1.1) 
    }
  
    100% {
      opacity: 1;
      transform: scale(1)
    }
    `;

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  overflow: hidden;
  color: #353535;
  border-radius: 100%;
  box-shadow: ${(props) =>
    props.shadow === false ? "" : "rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;"};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "white"};
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  z-index: ${(props) => props.zIndex && props.zIndex};
  position: ${(props) => props.position};
  top: ${(props) => props.top && props.top};
  bottom: ${(props) => props.bottom && props.bottom};
  left: ${(props) => props.left && props.left};
  margin: ${(props) => props.margin && props.margin};
  margin-left: ${(props) => props.marginLeft};
  animation: ${(props) =>
    props.animation &&
    css`
      ${enterAnimationRound} 2s
    `};

  &:hover {
    filter: brightness(95%);
  }
`;

export const CustomIconButton = ({
  children,
  name,
  position,
  marginLeft,
  margin,
  top,
  bottom,
  left,
  zIndex,
  shadow,
  backgroundColor,
  handleButtonClick,
  animation,
  iconWidth,
}) => {
  const Icon = Icons[name];
  return (
    <IconButton
      onClick={handleButtonClick}
      position={position}
      marginLeft={marginLeft}
      top={top}
      bottom={bottom}
      left={left}
      margin={margin}
      zIndex={zIndex}
      animation={animation}
      shadow={shadow}
      backgroundColor={backgroundColor}
    >
      {children}
      <img src={Icon} width={iconWidth ? iconWidth : "20px"} alt="icon" />
    </IconButton>
  );
};
