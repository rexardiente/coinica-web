import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function (character_hp, max_hp) {
  let ProgBar = null
  const progress = (character_hp/max_hp)*100
  if (progress >= 0 && progress < 9) {
    ProgBar = <ProgressBar variant="danger" now={progress} />
  } else if (progress >= 9 && progress < 26) {
    ProgBar = <ProgressBar variant="warning" now={progress} />
  } else if (progress >= 26 && progress <= 100) {
    ProgBar = <ProgressBar variant="success" now={progress} />
  }

  return ProgBar
}
