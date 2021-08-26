import React, { PureComponent } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { tie } from "../Assets";
import { rank_titles } from "../temp_data";
import "./Metrics.scss";
import { translate } from "helpers/translate";

interface Props {
  userName: string;
  rankData: { [key: string]: any };
  progressData: Array<{ [key: string]: any }>;
}

class Metrics extends PureComponent<Props> {
  getIconRank(rank: string): React.ReactNode {
    let iconElem: React.ReactNode = "__";
    if (rank) {
      iconElem = (
        <>
          <span className={`icon-rank icon-rank-${rank.toLowerCase()}`}></span>
          {rank.toLowerCase()}
        </>
      );
    }
    return iconElem;
  }

  fixedVal = (token: number | string) => {
    return token ? Number(token).toFixed(6) : 0;
  };

  render() {
    const {
      userName,
      rankData: { rank, next_rank, payout, points },
      progressData,
    } = this.props;
    return (
      <>
        <div className="vip-username">
          {userName} <span>( VIP )</span>
        </div>
        <div className="row mx-0 flex-column flex-md-row mb-md-5">
          <div className="vip-content-metrics d-flex px-3 py-4 col-sm-12 flex-row flex-md-column justify-content-between col-md-12 col-xl-8 mr-md-3">
            <div className="d-flex flex-md-row flex-column justify-content-between">
              {rank_titles.map((val, index) => (
                <div key={index} className="col-md-3 justify-content-between px-1">
                  <div className="title">
                    {val.title}
                    <span>{val.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-md-row flex-column justify-content-between">
              <div className="col-md-3 justify-content-between px-1">
                <div className="value">{this.getIconRank(rank)}</div>
              </div>
              <div className="col-md-3 justify-content-between px-1">
                <div className="value">{this.fixedVal(payout) || 0}</div>
              </div>
              <div className="col-md-3 justify-content-between px-1">
                <div className="value">{this.fixedVal(points) || 0}</div>
              </div>
              <div className="col-md-3 justify-content-between px-1">
                <div className="value">{this.getIconRank(next_rank)}</div>
              </div>
            </div>
          </div>

          <div className="vip-content-progress d-flex flex-md-row flex-column col align-items-center justify-content-around py-3">
            <div className="tie-wrapper col-md-6 col-sm-12 d-flex flex-row flex-md-column align-items-center justify-content-around h-100">
              <img alt="tie" src={tie} width="43" height="61" />
              <div className="tie-text">{translate("vip.metrics.next_level")}</div>
            </div>
            <div className="progress-wrapper col-md-6 col-sm-12 d-flex flex-row flex-md-column px-0 justify-content-around h-100">
              {progressData.map((progress, index) => (
                <div key={index} className="col-xs-12 col-md-12">
                  <div className="progress-title">{progress.title}</div>
                  <div className="d-flex justify-content-between">
                    <div className="progress-current">
                      {progress.currentVal}
                    </div>
                    <div className="progress-max">{progress.maxVal}</div>
                  </div>
                  <ProgressBar
                    now={Number(progress.currentVal)}
                    max={Number(progress.maxVal)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Metrics;
