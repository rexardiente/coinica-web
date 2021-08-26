import React, { PureComponent } from "react";
import "./ReferralTable.scss";
import {
  GetUserAccountById,
  ReferralHistory,
} from "services/api/server/platform";
import { translate } from "helpers/translate";

interface Props<T> {
  tbRowData?: Array<T>;
  thRowData: Array<string>;
  code: string;
}

type State = {
  tableData: any[] | null;
  userList;
};

export default class ReferralTable extends PureComponent<Props<any>, State> {
  constructor(props) {
    super(props);

    this.state = {
      tableData: null,
      userList: [],
    };
  }

  componentDidMount() {
    if (this.props.code !== "") {
      this.getReferralHistory();
    }
  }

  componentDidUpdate() {
    if (this.props.code !== "") {
      if (!this.state.tableData) {
        this.getReferralHistory();
      }
    } else {
      if (this.state.tableData) {
        this.setState({ tableData: null });
      }
    }
  }

  async getUser(referralCode) {
    try {
      const res = await GetUserAccountById(referralCode);
      return res.data;
    } catch (error) {
      console.log("error getting user by id", error);
    }
  }

  async getReferralHistory() {
    console.log('get referral history', this.props.code);

    try {
      const res = await ReferralHistory(this.props.code);
      if (res.data) {
        this.setState({
          tableData: res.data,
        });
      }
    } catch (error) {
      console.log("error getting referral history", error);
    }
  }

  render() {
    const { thRowData } = this.props;
    const { tableData } = this.state;

    return (
      <div className="table-responsive">
        <table className="referral-table table table-borderless">
          <thead className="text-muted">
            <tr>
              {thRowData.map((headVal) => (
                <th className="" key={headVal.toString()}>
                  <small> {translate(`referral.history.${headVal.toLowerCase()}`)}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.length ? (
              tableData.map((bodyVal) => {
                return (
                  <tr key={bodyVal.applied_by}>
                    <td>
                      {new Date(bodyVal.created_at).toLocaleDateString(
                        "en-US"
                      )}
                    </td>
                    <td>
                      {new Date(bodyVal.created_at).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </td>
                    <td>{bodyVal.applied_by}</td>
                    {/* <td>{bodyVal.feeAmount}</td>
                <td>{bodyVal.status}</td> */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  {translate("misc.noAvailableData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
