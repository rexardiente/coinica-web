import React, { PureComponent } from "react";
import HeaderToggleHistory from "./HeaderToggleHistory";
import Tab from "./Tab";
import "./Rankings.scss";

import {
  GetDailyRanking,
  GetMonthlyRanking,
  GetUsernameAccountById,
} from "services/api/server/platform";

type RankState = {
  profits: [];
  payouts: [];
  wagered: [];
  multipliers: [];
};

type State = {
  rankData: RankState;
  isLoading: Boolean;
  error: any;
};

class Rankings extends PureComponent<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      rankData: {
        profits: [],
        payouts: [],
        wagered: [],
        multipliers: [],
      },
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.handleToggle("history");
  }

  async getRanking(filter: string) {
    try {
      const res = await (filter === "24"
        ? GetDailyRanking
        : GetMonthlyRanking)();

      const profits = (await this.getUser(res.data.profits)) as [];
      const payouts = (await this.getUser(res.data.payouts)) as [];
      const wagered = (await this.getUser(res.data.wagered)) as [];
      const multipliers = (await this.getUser(res.data.multipliers)) as [];

      this.setState({
        rankData: { profits, payouts, wagered, multipliers },
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  getUser = async (data: Array<any>) => {
    try {
      if (data.length) {
        return await Promise.all(
          data.map(async (value) => {
            const res = await GetUsernameAccountById(value.user);
            const user = res.data[1] || "";

            return {
              ...value,
              user,
            };
          })
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  handleToggle = (val: "history" | "24") => {
    this.setState({ isLoading: true }, () => {
      this.getRanking(val);
    });
  };

  render() {
    const { rankData } = this.state;

    return (
      <div id="ranking-container" className="p-5">
        <div className="ranking-header">
          <HeaderToggleHistory onToggle={this.handleToggle} />
        </div>
        <div className="tab-ranking row mr-0 ml-3 mt-3">
          <div className="bg-cup"></div>
          <div className="col-xl-7 col-lg-12 px-0">
            <Tab rankingData={rankData} />
          </div>
        </div>
        {/* <div className="row mt-md-2 ml-md-3">
          <div className="col-md-12 col-xl-9">
            <Instructions />
          </div>
        </div> */}
      </div>
    );
  }
}

export default Rankings;
