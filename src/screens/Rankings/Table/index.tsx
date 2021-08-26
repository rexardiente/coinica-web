import React, { PureComponent } from "react";
import { translate } from "helpers/translate";
import "./Table.scss";

type Props = {
  thRowData: Array<React.ReactNode>;
  tbRowData: Array<{ [key: string]: string }>;
};

class Table extends PureComponent<Props> {
  render() {
    const { thRowData, tbRowData } = this.props;
    const rowKey = tbRowData.length && Object.keys(tbRowData[0]);

    return (
      <table role="table" className="table table-ranking">
        <thead>
          <tr role="row">
            {thRowData?.map((headVal, index) => (
              <th role="cell" key={index}>
                {headVal}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!tbRowData.length ? (
            <tr>
              <td colSpan={thRowData?.length} className="text-center">
                {translate("misc.noAvailableData")}
              </td>
            </tr>
          ) : (
            tbRowData.map((bodyVal, index) => (
              <tr role="row" key={index}>
                <td role="cell">{index + 1}</td>
                <td role="cell">
                  {/* <img
                    src={sampleProfile}
                    alt="profile"
                    className="img-profile"
                  /> */}
                  {bodyVal[rowKey[0]]}
                </td>
                <td role="cell">{bodyVal[rowKey[1]]}</td>
                <td role="cell">{bodyVal[rowKey[2]]}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}

export default Table;
