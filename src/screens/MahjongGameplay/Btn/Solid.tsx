import React from "react";
import styles from "./Btn.module.scss";

type Props = {
  onClick: () => void;
  label: string;
  width?: number | string;
  height?: number | string;
  containerClass?: Object | string;
  labelClass?: Object | string;
  isDisabled?: Boolean;
};
const BtnSolid = (props: Props) => {
  const {
    onClick,
    width,
    height,
    label,
    labelClass,
    containerClass,
    isDisabled,
  } = props;

  return (
    <button
      className={`${styles.solidContainer} ${containerClass || ""} ${
        isDisabled ? styles.disabled : "hover-cursor-scale"
      }`}
      style={{ width, height }}
      onClick={!isDisabled ? onClick : undefined}
    >
      <div className={`${labelClass}`}>{label}</div>
    </button>
  );
};
export default BtnSolid;
