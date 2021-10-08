import { useMemo } from "react";

type SvgProps = {
  id?: string;
  text: string;
  fromColor: string;
  toColor: string;
  width?: string | number;
  height?: string | number;
  className?: string;
};

const TextSvg = ({
  id,
  text,
  fromColor,
  toColor,
  width,
  height,
  className,
}: SvgProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id} y1="0" y2="1">
          <stop key="0" stopColor={fromColor} offset="10%" />
          <stop key="1" stopColor={toColor} offset="90%" />
        </linearGradient>
      </defs>

      <text
        fill={`url(#${id})`}
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
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
  fromColor,
  toColor,
  width,
  height,
  className,
}: SvgProps) => {
  const generateId = useMemo(() => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }, []);

  const _width = width || "auto";
  const _height = height || "auto";
  const uniqueId = id || "gradient-" + generateId;

  return (
    <TextSvg
      id={uniqueId}
      text={text}
      fromColor={fromColor}
      toColor={toColor}
      width={_width}
      height={_height}
      className={className}
    />
  );
};

export default GradientText;
