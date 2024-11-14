import * as React from "react";

interface AcmeLogoProps {
  height?: number; // Optional prop for height, default is 36
  width?: number;  // Optional prop for width, default is 36
  fill?: string;   // Optional prop for fill color, default is 'currentColor'
}

export const AcmeLogo: React.FC<AcmeLogoProps> = ({
  height = 36,
  width = 36,
  fill = "currentColor",
}) => (
  <svg
    fill={fill}
    height={height}
    viewBox="0 0 32 32"
    width={width}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill={fill}
      fillRule="evenodd"
    />
  </svg>
);
