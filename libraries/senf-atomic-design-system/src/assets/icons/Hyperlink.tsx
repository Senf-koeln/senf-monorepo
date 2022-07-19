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

const Hyperlink: FC<SVGRProps> = ({ color = "black", transform }) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Hyperlink"
    transform={transform}
  >
    <title>Hyperlink</title>
    <g
      id="Icons"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="Hyperlink" fill="#000000">
        <path
          d="M9.5834,6.4169 C10.2914,7.1249 10.6824,8.0659 10.6824,9.0679 C10.6824,10.0689 10.2914,11.0119 9.5834,11.7199 L6.4014,14.9009 C5.6704,15.6329 4.7104,15.9979 3.7494,15.9979 C2.7894,15.9979 1.8294,15.6329 1.0984,14.9009 C-0.3636,13.4399 -0.3636,11.0609 1.0984,9.5989 L3.1504,7.5459 C3.4434,7.2529 3.9184,7.2529 4.2114,7.5459 C4.5044,7.8389 4.5044,8.3129 4.2114,8.6059 L2.1584,10.6589 C1.2814,11.5369 1.2814,12.9639 2.1584,13.8409 C3.0094,14.6899 4.4924,14.6889 5.3414,13.8409 L8.5224,10.6589 C8.9474,10.2339 9.1824,9.6689 9.1824,9.0679 C9.1824,8.4669 8.9474,7.9019 8.5224,7.4769 C8.2294,7.1849 8.2294,6.7099 8.5224,6.4169 C8.8144,6.1249 9.2894,6.1229 9.5834,6.4169 Z M14.9017,1.0986 C15.6097,1.8066 16.0007,2.7486 16.0007,3.7496 C16.0007,4.7516 15.6097,5.6936 14.9017,6.4016 L12.8487,8.4536 C12.5557,8.7466 12.0817,8.7466 11.7887,8.4536 C11.4957,8.1606 11.4957,7.6866 11.7887,7.3936 L13.8417,5.3406 C14.2657,4.9156 14.5007,4.3516 14.5007,3.7496 C14.5007,3.1496 14.2657,2.5836 13.8417,2.1586 C12.9907,1.3086 11.5077,1.3096 10.6587,2.1586 L7.4767,5.3406 C7.0517,5.7656 6.8177,6.3306 6.8177,6.9326 C6.8177,7.5326 7.0517,8.0986 7.4767,8.5236 C7.7697,8.8166 7.7697,9.2906 7.4767,9.5836 C7.3307,9.7306 7.1387,9.8036 6.9467,9.8036 C6.7547,9.8036 6.5627,9.7306 6.4167,9.5836 C5.7087,8.8756 5.3177,7.9336 5.3177,6.9326 C5.3177,5.9306 5.7087,4.9886 6.4167,4.2806 L9.5977,1.0986 C11.0597,-0.3634 13.4377,-0.3654 14.9017,1.0986 Z"
          id="🎨-Icon-Color"
        ></path>
      </g>
    </g>
  </Svg>
);

export default Hyperlink;
