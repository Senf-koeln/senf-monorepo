/** @format */

import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const RippleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;

  font-size: 14pt;
  font-family: Futura PT W01 Book;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: 0.75;
    background-color: ${(props) => props.color};
    animation-name: ripple;
    animation-duration: ${(props) => props.duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounce = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 4);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

const ExpandButton = ({
  duration = 850,
  color = "#cecece",
  handleButtonClick,
  dataCy,
  children,
}) => {
  const [rippleArray, setRippleArray] = useState([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = (event) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <RippleContainer
      duration={duration}
      color={color}
      onMouseDown={addRipple}
      onClick={handleButtonClick}
      data-cy={dataCy}
    >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={"span" + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          );
        })}
      {children}
    </RippleContainer>
  );
};

ExpandButton.propTypes = {
  duration: PropTypes.number,
  color: PropTypes.string,
};

export default ExpandButton;

// import React from "react";
// import styled from "styled-components";

// const ButtonExpandRippleAfter = styled.button`
//   & {
//     background-color: transparent;
//     position: absolute;
//     left: 0%;
//     top: 0%;
//     width: 100%;
//     height: 100%;
//     border-radius: 20px;
//     z-index: 9;

//     font-size: 14pt;
//     font-family: Futura PT W01 Book;
//   }

//   /* &::after {
//     content: "";
//     position: absolute;
//     left: 50%;
//     top: 50%;
//     border-radius: 50%;
//     padding: 50%;
//     width: 32px;
//     height: 32px;
//     background-color: currentColor;
//     opacity: 0;
//     transform: translate(-50%, -50%) scale(1);
//     transition: opacity 1s, transform 0.5s;
//   } */
// `;

// const ExpandButton = ({ handleButtonClick, dataCy, children }) => {
//   return (
//     <ButtonExpandRippleAfter onClick={handleButtonClick} data-cy={dataCy}>
//       {children}
//     </ButtonExpandRippleAfter>
//   );
// };

// export default ExpandButton;