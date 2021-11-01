import React from "react";
import styles from "./Btn.module.scss";

type Props = {
  onClick: () => void;
  imgSrc: string;
  leftIconSrc: string;
  label: string;
  labelSpan: string | number;
  containerClass?: Object | string;
  isDisabled?: Boolean;
  title?: string;
};
const BtnGradient = (props: Props) => {
  const {
    imgSrc,
    leftIconSrc,
    onClick,
    label,
    labelSpan,
    containerClass,
    isDisabled,
    title,
  } = props;
  return (
    <button
      style={{ backgroundImage: `url(${imgSrc})` }}
      className={`${containerClass} ${styles.gradientContainer} ${
        isDisabled ? styles.disabled : ""
      }`}
      onClick={!isDisabled ? onClick : undefined}
      title={title}
    >
      <img
        className={styles.icon}
        src={leftIconSrc}
        alt="arrow"
        width="30"
        height="30"
      />
      <div className={`${styles.gradientLabel} text-stroke-brown`}>
        {label} <span>{labelSpan}</span>
      </div>
    </button>
  );
};
export default BtnGradient;
