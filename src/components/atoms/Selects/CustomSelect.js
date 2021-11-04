/** @format */

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

//Images
import Arrow from "../../../images/icons/arrow.png";

//Components
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const DropDownButton = styled.button`
  font-family: Futura PT W01 Book;
  font-size: 20px;
  color: #353535;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  /* border: 0.5px solid #353535; */
  background-color: transparent;
`;

const DropDownListContainer = styled.div`
  display: block;
  background-color: white;
  box-shadow: rgb(38, 57, 77, 0.7) 0px 20px 30px -15px;

  border: 1px solid #e5e5e5;

  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 95%;
  max-width: 400px;
  height: auto;
  max-height: 80vh;
  overflow: scroll;
  box-sizing: border-box;
  z-index: 999;
  border-radius: 20px;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 998;
  background-color: rgb(0, 0, 0, 0.6);
`;

const DropDownList = styled.ul`
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
`;

const ListItem = styled("li")`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  text-align: left;
  color: #353535;
  font-family: Futura PT W01 Book;
  font-size: 20px;
  height: 30px;
  padding: 10px;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const ColorDot = styled.div`
  width: 16px;
  position: relative;
  height: 16px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  opacity: 1;

  margin-right: 10px;
`;
const Img = styled.img`
  width: 40px;
  position: relative;
  height: 40px;
  border-radius: 15px;
  margin-right: 10px;
`;

const Span = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CustomSelect = ({ value, initialValue, options, handleDropdown }) => {
  const [open, setOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(
    value === "" ? initialValue : value
  );
  const [selectedLabel, setSelectedLabel] = useState(initialValue);
  const [isInViewport, setIsInViewport] = useState(true);

  useEffect(() => {
    if (open) {
      const box = document.querySelector("#container");
      const rect = box.getBoundingClientRect();
      const isInViewportVar =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      setIsInViewport(isInViewportVar);
    }
  }, [open]);

  useEffect(() => {
    for (const option of options) {
      if (option.name === value) {
        setSelectedLabel(option.label);
      }
    }
  }, []);

  const outerRef = useRef();
  useOnClickOutside(outerRef, () => setOpen(false));

  const handleToggle = (event) => {
    event.preventDefault();

    setOpen(!open);
  };

  const onOptionClicked = (value, label) => () => {
    setSelectedOption(value);
    setSelectedLabel(label);
    handleDropdown(value);
    setOpen(false);
  };

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return (
    <div ref={outerRef}>
      <DropDownButton
        onClick={handleToggle}
        class="dropbtn"
        style={{ zIndex: 999 }}
      >
        {truncateString(selectedLabel, 25)}

        <img
          src={Arrow}
          width="20px"
          style={{
            paddingLeft: "10px",
            transition: "0.5s",
            transform: open && "scaleY(-1)",
          }}
        ></img>
      </DropDownButton>
      {open && (
        <React.Fragment>
          <DropDownListContainer id="container">
            <DropDownList>
              {options.map((option) => (
                <ListItem
                  onClick={onOptionClicked(option.name, option.label)}
                  key={Math.random()}
                >
                  {option.name === selectedOption ||
                  option.label === selectedOption ? (
                    <Span style={{ fontFamily: "Futura PT W01-Bold" }}>
                      {option.color && <ColorDot color={option.color} />}
                      {option.img && <Img src={option.img} />}
                      {truncateString(option.label, 22)}
                    </Span>
                  ) : (
                    <Span>
                      {" "}
                      {option.color && <ColorDot color={option.color} />}
                      {option.img && <Img src={option.img} />}
                      {truncateString(option.label, 30)}
                    </Span>
                  )}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>

          <Background onClick={() => setOpen(false)} />
        </React.Fragment>
      )}
    </div>
  );
};

export default CustomSelect;
