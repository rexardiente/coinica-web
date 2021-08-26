import React, { PureComponent } from "react";
import { clock } from "../Assets";
import Box from "../Box";

interface Props {
  data: Array<{
    id: number | string;
    game_name: string;
    currentProgress: number;
    maxProgress: number;
    vipPoints: number | string;
    isCompleted: boolean;
  }>;
}

export default class WeeklyTask extends PureComponent<Props> {
  render() {
    return (
      <>
        <div className="weekly-task-header d-flex align-items-center mb-3">
          <div className="weekly-timer d-flex align-items-center">
            Weekly Tasks
            <div className="icon-clock">
              <img src={clock} alt="clock" /> 5 Days 20 Hours
            </div>
          </div>
        </div>
        <div className="d-flex flex-md-row flex-column row">
          {this.props.data.map((rate) => (
            <div key={rate.id} className="col-xl-6 col-lg-12 mb-3">
              <Box
                game_name={rate.game_name}
                currentProgress={rate.currentProgress}
                maxProgress={rate.maxProgress}
                vipPoints={rate.vipPoints}
                isCompleted={rate.isCompleted}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}
