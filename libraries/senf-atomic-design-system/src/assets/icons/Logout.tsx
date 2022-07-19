/** @format */

import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

interface SVGRProps {
  color?: string;
  transform?: string;
}

const Svg = styled.svg`
  transform: ${({ transform }) => (transform ? transform : undefined)};
`;

const Logout = ({
  color = "black",
  transform,
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Logout
  "
    transform={transform}
  >
    <title>Logout</title>
    <g
      id="Icons"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="Logout" fill="#000000">
        <path
          d="M13.4739,11.4466 C13.0599,11.4466 12.7239,11.7826 12.7239,12.1966 L12.7239,12.8786 C12.7239,13.0256 12.6049,13.1446 12.4569,13.1446 L9.7019,13.1446 C9.2869,13.1446 8.9519,13.4806 8.9519,13.8946 C8.9519,14.3086 9.2869,14.6446 9.7019,14.6446 L12.4569,14.6446 C13.4309,14.6446 14.2239,13.8516 14.2239,12.8786 L14.2239,12.1966 C14.2239,11.7826 13.8879,11.4466 13.4739,11.4466 M9.7014,2.8548 L12.4574,2.8548 C12.6044,2.8548 12.7234,2.9738 12.7234,3.1218 L12.7234,3.8028 C12.7234,4.2168 13.0594,4.5528 13.4734,4.5528 C13.8884,4.5528 14.2234,4.2168 14.2234,3.8028 L14.2234,3.1218 C14.2234,2.1478 13.4304,1.3548 12.4574,1.3548 L9.7014,1.3548 C9.2874,1.3548 8.9514,1.6908 8.9514,2.1048 C8.9514,2.5188 9.2874,2.8548 9.7014,2.8548 M15.8495,7.7137 C15.8115,7.6217 15.7565,7.5387 15.6875,7.4697 L14.0045,5.7857 C13.7115,5.4937 13.2365,5.4917 12.9435,5.7857 C12.6505,6.0787 12.6505,6.5527 12.9435,6.8457 L13.3475,7.2507 L9.7015,7.2507 C9.2875,7.2507 8.9515,7.5867 8.9515,8.0007 C8.9515,8.4147 9.2875,8.7507 9.7015,8.7507 L13.3465,8.7507 L12.9435,9.1537 C12.6505,9.4467 12.6505,9.9217 12.9435,10.2137 C13.0905,10.3607 13.2815,10.4337 13.4735,10.4337 C13.6665,10.4337 13.8575,10.3607 14.0045,10.2137 L15.6875,8.5307 C15.7565,8.4617 15.8115,8.3787 15.8495,8.2867 C15.9255,8.1037 15.9255,7.8967 15.8495,7.7137 M5.2479,8.1341 C4.7829,8.1341 4.4059,7.7571 4.4059,7.2921 C4.4059,6.8271 4.7829,6.4501 5.2479,6.4501 C5.7129,6.4501 6.0899,6.8271 6.0899,7.2921 C6.0899,7.7571 5.7129,8.1341 5.2479,8.1341 M6.2479,0.0261 L1.1669,1.0161 C0.4909,1.1481 -0.0001,1.7511 -0.0001,2.4511 L-0.0001,13.5491 C-0.0001,14.2491 0.4909,14.8521 1.1669,14.9831 L6.2479,15.9741 C6.3379,15.9911 6.4289,16.0001 6.5189,16.0001 C6.8459,16.0001 7.1649,15.8861 7.4229,15.6731 C7.7609,15.3951 7.9549,14.9811 7.9549,14.5391 L7.9549,1.4611 C7.9549,1.0181 7.7609,0.6051 7.4229,0.3261 C7.0939,0.0551 6.6669,-0.0539 6.2479,0.0261"
          id="🎨-Icon-Color"
        ></path>
      </g>
    </g>
  </Svg>
);

export default Logout;
