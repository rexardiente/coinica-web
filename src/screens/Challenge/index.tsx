import React, { Component } from "react";
import { rewardSet } from "../Challenge/ChallengeData";
import Header from "../Challenge/Header";
import ChallengeTable from "../Challenge/Table";
import TopThree from "../Challenge/TopThree";
import Rewards from "../Challenge/Rewards";
import ButtonToggle from "../../components/ButtonToggle";
import "./Challenge.scss";
import { GetUsernameAccountById } from "../../services/api/server/platform";
import { translate } from "helpers/translate";
import { banner } from "./Assets";

import {
  GetChallengeRankToday,
  GetChallengeRankYesterday,
} from "../../services/api/server/platform";

const buttonOpts = [
  {
    value: "yesterday",
    label: translate("challenge.yesterday.button"),
  },
  {
    value: "today",
    label: translate("challenge.today.button"),
  },
];

const tableHeaders = [
  "#",
  translate("challenge.table.player"),
  translate("challenge.table.bets"),
  translate("challenge.table.payouts"),
  translate("challenge.table.ratio"),
  translate("challenge.table.vip_points"),
];

type DataState = {
  user: string;
  playerName: string;
  bets: number;
  wagered: number;
  ratio: number;
  points: number;
};

type State = {
  challengeData: DataState[];
  isLoading: Boolean;
  error: any;
};

class Challenge extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      challengeData: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.handleToggle("today");
  }

  async getChallengeRank(val: string) {
    try {
      const res = await (val === "yesterday"
        ? GetChallengeRankYesterday
        : GetChallengeRankToday)();

      const data = val === "yesterday" ? res.data.rank_users : res.data;
      const challengeData = await this.getUsername(data);

      this.setState({
        challengeData,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error,
      });
    }
  }

  async getUsername(data: DataState[]) {
    try {
      if (data.length) {
        return await Promise.all(
          data.map(async (account: DataState) => {
            const res = await GetUsernameAccountById(account.user);

            return { ...account, playerName: res.data[1] };
          })
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  topThree() {
    const { challengeData } = this.state;
    if (challengeData.length) {
      let top = challengeData.slice(0, 3);
      return top.length < 3
        ? [...top, ...new Array(3 - top.length).fill({})]
        : top;
    }
    return new Array(3).fill({});
  }

  handleToggle = (val: "yesterday" | "today") => {
    this.setState({ isLoading: true }, () => {
      this.getChallengeRank(val);
    });
  };

  render() {
    const { challengeData } = this.state;
    return (
      <div className="pt-5">
        <Header />

        <div className="challenge-banner px-3 px-md-5">
          <img src={banner} width="100%" className="img-fluid" alt="icon" />
          <div className="d-flex justify-content-center" id="button-toggle">
            <ButtonToggle
              defaultValue={buttonOpts[1].value}
              opts={buttonOpts}
              onToggle={this.handleToggle}
            />
          </div>
        </div>

        <div className="challenge-container">
          {/* top 3 */}
          <TopThree topThree={this.topThree()} />
        </div>

        {/* table */}
        <ChallengeTable thRowData={tableHeaders} tbRowData={challengeData} />

        <div className="challenge-container">
          {/* total payout */}
          <Rewards rewardSet={rewardSet} />
        </div>
      </div>
    );
  }
}

export default Challenge;
