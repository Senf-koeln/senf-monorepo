/** @format */

import React, { FC } from "react";
import { SVGProps } from "react";
import styled from "styled-components";

interface SVGRProps {
  color?: string;
  transform?: string;
}

const Svg = styled.svg`
  transform: ${({ transform }) => (transform ? transform : undefined)};
`;

const CalendarIcon: FC<SVGRProps> = ({ color = "black", transform }) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="CalendarIcon"
    transform={transform}
  >
    <title>CalendarIcon</title>
    <g
      id="Icons"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="CalendarIcon" fill={color}>
        <path
          d="M14.5,13.4312 C14.498,14.0202 14.018,14.5002 13.427,14.5002 L2.573,14.5002 C1.982,14.5002 1.501,14.0182 1.501,13.4272 L1.501,7.6612 C1.503,7.1582 1.911,6.7502 2.415,6.7502 L13.586,6.7502 C14.09,6.7502 14.5,7.1602 14.5,7.6652 L14.5,13.4312 Z M13.427,2.2502 L13.427,2.2502 C13.151,2.2502 12.927,2.0262 12.927,1.7502 L12.927,0.7502 C12.927,0.3362 12.592,0.0002 12.177,0.0002 C11.763,0.0002 11.427,0.3362 11.427,0.7502 L11.427,2.2502 L11.427,3.7502 C11.427,4.1642 11.092,4.5002 10.677,4.5002 C10.263,4.5002 9.927,4.1642 9.927,3.7502 L9.927,2.7502 C9.927,2.4742 9.704,2.2502 9.427,2.2502 L6.573,2.2502 C6.297,2.2502 6.073,2.0262 6.073,1.7502 L6.073,0.7502 C6.073,0.3362 5.737,0.0002 5.323,0.0002 C4.909,0.0002 4.573,0.3362 4.573,0.7502 L4.573,2.2502 L4.573,3.7502 C4.573,4.1642 4.237,4.5002 3.823,4.5002 C3.409,4.5002 3.073,4.1642 3.073,3.7502 L3.073,2.7502 C3.073,2.4692 2.838,2.2482 2.558,2.2502 C1.144,2.2582 0.001,3.4062 0.001,4.8222 L0.001,5.9422 C0.001,5.9442 1.77635684e-15,5.9462 1.77635684e-15,5.9492 L1.77635684e-15,6.6952 L1.77635684e-15,13.5202 L1.77635684e-15,13.5852 C1.77635684e-15,14.9182 1.081,16.0002 2.415,16.0002 L2.48,16.0002 L2.573,16.0002 L13.427,16.0002 L13.521,16.0002 L13.586,16.0002 C14.919,16.0002 16,14.9192 16,13.5862 L16,13.5202 L16,13.4352 C16,13.4322 16.001,13.4302 16.001,13.4272 L16.001,4.8232 C16.001,3.4022 14.849,2.2502 13.427,2.2502 L13.427,2.2502 Z"
          id="🎨-Icon-Color"
        ></path>
      </g>
    </g>
  </Svg>
);

export default CalendarIcon;
