import React, { PureComponent } from "react";
import { translate } from "helpers/translate";
import Box from "../Box";
import { icon_tasks } from "../Assets";

interface Props {
  data: Array<{
    game_name: string;
    currentProgress: number;
    maxProgress: number;
    vipPoints: number | string;
    isCompleted: boolean;
  }>;
}

export default class DailyTask extends PureComponent<Props> {
  render() {
    return (
      <>
        <div className="daily-task-header d-flex align-items-center mb-3">
          <div className="icon-note">
            <img src={icon_tasks} alt="icon" width="35" height="33" />
          </div>
          <div className="daily-timer d-flex align-items-center">
            {translate("task.daily")}
            {/* <div className="icon-clock"><img src="https://i.imgur.com/TkmXy5N.png" alt="clock" /> 21:02:44</div> */}
          </div>
        </div>
        <div className="d-flex flex-md-row flex-column row">
          {this.props.data.length ? (
            this.props.data.map((rate, index) => (
              <div
                key={`daily-${index}`}
                className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-3"
              >
                <Box
                  game_name={rate.game_name}
                  currentProgress={rate.currentProgress}
                  maxProgress={rate.maxProgress}
                  vipPoints={rate.vipPoints}
                  isCompleted={rate.isCompleted}
                />
              </div>
            ))
          ) : (
            <div className="text-center w-100">{translate("misc.noAvailableData")}</div>
          )}
        </div>
      </>
    );
  }
}
