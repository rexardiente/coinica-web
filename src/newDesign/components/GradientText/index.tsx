import React, { useMemo } from "react";

type SvgProps = {
  id?: string;
  text: string | React.ReactNode;
  textAnchor?: "start" | "middle" | "end";
  fromColor: string;
  toColor: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  x?: string;
  y?: string;
};

const TextSvg = ({
  id,
  text,
  textAnchor,
  fromColor,
  toColor,
  width,
  height,
  className,
  x,
  y,
}: SvgProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id} x2="0%" y2="100%">
          <stop key="0" stopColor={fromColor} offset="10%" />
          <stop key="1" stopColor={toColor} offset="90%" />
        </linearGradient>
      </defs>

      <text
        fill={`url(#${id})`}
        x={x}
        y={y}
        dominantBaseline="middle"
        textAnchor={textAnchor}
        strokeLinejoin="round"
      >
        {text}
      </text>
    </svg>
  );
};

const GradientText = ({
  id,
  text,
  textAnchor = "middle",
  fromColor,
  toColor,
  width = "100%",
  height = "100%",
  x = "50%",
  y = "50%",
  className,
}: SvgProps) => {
  const generateId = useMemo(() => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }, []);

  const uniqueId = id || "gradient-" + generateId;

  return (
    <TextSvg
      id={uniqueId}
      text={text}
      textAnchor={textAnchor}
      fromColor={fromColor}
      toColor={toColor}
      width={width}
      height={height}
      className={className}
      x={x}
      y={y}
    />
  );
};

export default GradientText;
