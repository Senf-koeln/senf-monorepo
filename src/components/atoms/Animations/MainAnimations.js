/** @format */

import React from "react";
import styled from "styled-components";

const MainAnimation = styled.div`
  opacity: 1;
  animation: cardanimation 0.8s ease-in-out;
  height: ${(props) => props.height && props.height};
  margin-top: ${(props) => props.marginTop && props.marginTop};
  padding-bottom: ${(props) => props.paddingBottom && props.paddingBottom};
  transition: ${(props) => props.transition && props.transition};
  display: ${(props) => props.display && props.display};
  top: ${(props) => (props.top ? props.top : 0)};
  position: ${(props) => props.position && props.position};
  width: 100%;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

/* .MainAnimation {
  // opacity: 1;
  // animation: cardanimation 0.8s ease-in-out;
}

.MainAnimation2 {
  // opacity: 1;
  // height: 100vh;
  // margin-top: 90px;
  // animation: cardanimation 0.8s ease-in-out;
}

.MainAnimationChannels {
  // opacity: 1;
  // display: block;
  // transition: 0.5s;
  // padding-bottom: 2em;
  // height:100%;
  // animation: cardanimation 0.8s ease-in-out;
} */

const MainAnimations = ({
  children,
  height,
  marginTop,
  paddingBottom,
  transition,
  display,
  position,
  top,
}) => {
  return (
    <MainAnimation
      height={height}
      marginTop={marginTop}
      paddingBottom={paddingBottom}
      transition={transition}
      display={display}
      position={position}
      top={top}
    >
      {children}
    </MainAnimation>
  );
};

export default MainAnimations;
