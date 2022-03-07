import styled from "styled-components";

export const NoMore = styled.h3`
  color: rgb(87, 87, 87);
  position: absolute;
  margin-top: 0vh;
  margin-left: 0vw;
  width: 100%;
  text-align: center;
  animation: NoMoreAnimation 1s;

  @keyframes NoMoreAnimation {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

export const NoContent = styled.div`
  position: relative;
  font-size: 16px;
  color: #414345;
  width: 80%;
  margin-left: 24px;
  text-align: left;
  z-index: 10;
`;
