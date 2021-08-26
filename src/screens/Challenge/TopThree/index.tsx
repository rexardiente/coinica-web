import React, { PureComponent } from "react";
import * as assets_url from "../Assets";
import { translate } from "helpers/translate";
import "./TopThree.scss";

interface Props<T> {
  topThree: Array<T> | undefined;
}

const trophies = [
  assets_url.trophy_gold, //gold trophy
  assets_url.trophy_silver, //silver trophy
  assets_url.trophy_bronze, //bronze3 trophy
];

export default class TopThree extends PureComponent<Props<any>> {
  render() {
    const { topThree } = this.props;

    return (
      <div className="card-deck pt-5">
        {topThree?.map((top, index) => (
          <div className="card top-three p-2 border-0">
            <div className="row no-gutters">
              <div className="col-2">
                {/* <img
                  src={top.image || ""}
                  className="card-img mx-auto img-fluid mt-1"
                  alt=""
                /> */}
              </div>
              <div className="col-8">
                <div className="p-2">
                  <h5>{top.playerName || translate("misc.na")}</h5>
                  <span className="card-text">{top.vip_points || ""}</span>
                </div>
              </div>
              <div className="col-2 p-1">
                <img
                  src={trophies[index]}
                  className="card-img mx-auto img-fluid mt-1"
                  alt="img_trophy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
