import React, { PureComponent } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { translate } from "helpers/translate";
import { tick } from "../Assets";
import "./Box.scss";

interface Props {
  game_name: string;
  currentProgress: number;
  maxProgress: number;
  vipPoints: number | string;
  isCompleted: boolean;
}

export default class Box extends PureComponent<Props> {
  renderTagComplete() {
    return (
      <div className="tag-complete d-inline-flex align-items-center">
        <img src={tick} alt="tick" width="18" height="18" />{" "}
        <div>{translate("task.box.completed")}</div>
      </div>
    );
  }

  render() {
    const {
      game_name,
      currentProgress,
      maxProgress,
      vipPoints,
      isCompleted,
    } = this.props;
    return (
      <div
        className={`task-box px-3 pt-4 pb-5 d-flex flex-column justify-content-between 
          ${!isCompleted ? "incomplete" : "complete"}-bg`}
      >
        <div>
          <div className="game-title">{game_name}</div>
          <div className="number-of-play">
            {translate("task.box.play")} {game_name}{" "}
            <span className="text-green">{maxProgress} {translate("task.box.times")}</span>
          </div>
        </div>

        <div className="task-progress py-3">
          <div className="progress-number-wrapper d-flex justify-content-between">
            <div>{!isCompleted ? currentProgress : null}</div>
            <div>{maxProgress}</div>
          </div>
          <ProgressBar now={currentProgress} max={maxProgress} />
        </div>
        <div>
          {isCompleted ? (
            this.renderTagComplete()
          ) : (
            <div className="text-get">{translate("task.box.get")}</div>
          )}
          <div className="text-vip-points">
            <span className="text-green">{vipPoints}</span> {translate("task.box.vip.points")}{" "}
            {isCompleted && translate("task.box.earned")}
          </div>
        </div>
      </div>
    );
  }
}
