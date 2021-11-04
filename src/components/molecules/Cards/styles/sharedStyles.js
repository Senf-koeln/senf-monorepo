/** @format */

import styled from "styled-components";

export const LikeButtonWrapper = styled.div`
  top: ${(props) => (props.ideaCardBig ? "55px" : "5px")};
  left: 85%;
  width: 15%;
  z-index: 12;
  position: absolute;
  text-align: center;
`;

export const Engagement = styled.div`
  color: black;
  width: 100%;
  font-size: 14px;
  text-align: center;
  padding-right: 10px;
`;

export const CommentButtonWrapper = styled.div`
  top: ${(props) => (props.ideaCardBig ? "175px" : "90px")};
  left: 85%;
  width: 15%;
  position: absolute;
  z-index: 12;
`;
