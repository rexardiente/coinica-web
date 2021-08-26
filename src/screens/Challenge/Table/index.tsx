import React, { PureComponent } from "react";
import { translate } from "helpers/translate";
import "./Table.scss";

interface Props<T> {
  tbRowData: Array<T> | undefined;
  thRowData: Array<React.ReactNode>;
}

export default class ChallengeTable extends PureComponent<Props<any>> {
  render() {
    const { thRowData, tbRowData } = this.props;
    return (
      <div id="challenge-table-container" className="table-responsive">
        <table className="challenge-table table table-borderless">
          <thead className="text-muted">
            <tr>
              {thRowData.map((headVal) => (
                <th>{headVal}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!tbRowData?.length ? (
              <tr>
                <td colSpan={6} className="text-center">
                  {translate("misc.noAvailableData")}
                </td>
              </tr>
            ) : (
              tbRowData?.map((bodyVal, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {/* <img
                      src={bodyVal.image || ""}
                      className="mr-2 rounded-circle"
                      height="30px"
                      width="30px"
                      alt=""
                    /> */}
                    {bodyVal.playerName || "N/A"}
                  </td>
                  <td>{bodyVal.bets}</td>
                  <td>{bodyVal.wagered}</td>
                  <td>{bodyVal.ratio}</td>
                  <td>{bodyVal.points}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
