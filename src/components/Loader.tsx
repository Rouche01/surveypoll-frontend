import React from "react";

interface LoaderProps {
  color: string;
  size: number;
  ml?: number;
}

const Loader: React.FC<LoaderProps> = ({ color, size, ml }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: "auto",
        background: "rgb(221, 221, 221, 0)",
        display: "block",
        shapeRendering: "auto",
        marginLeft: ml ? `${ml}px` : 0,
      }}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r="32"
        strokeWidth="8"
        stroke={color}
        strokeDasharray="50.26548245743669 50.26548245743669"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default Loader;
