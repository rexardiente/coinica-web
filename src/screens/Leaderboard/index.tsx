import React from "react";
import $ from "jquery";
import * as Icon from "react-bootstrap-icons";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
// import styles from "./leaderboard.module.scss";

class Leaderboard extends React.Component {
  // reset after closing just to make sure on nxt visit it will load default.
  componentWillUnmount() {
    $(".collapse.history").collapse({ toggle: false });
  }

  UNSAFE_componentWillMount() {
    $(".collapse.history").collapse({ toggle: false });
  }

  toggleButtons() {
    return (
      <div>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
          <ToggleButton
            value={1}
            size="sm"
            data-toggle="collapse"
            data-target="#collapseProfit"
            aria-expanded="false"
            aria-controls="collapseProfit"
          >
            Profit
          </ToggleButton>
          <ToggleButton
            value={2}
            size="sm"
            data-toggle="collapse"
            data-target="#collapsePayout"
            aria-expanded="false"
            aria-controls="collapsePayout"
          >
            Payout
          </ToggleButton>
          <ToggleButton
            value={3}
            size="sm"
            data-toggle="collapse"
            data-target="#collapseWagered"
            aria-expanded="false"
            aria-controls="collapseWagered"
          >
            Wagered
          </ToggleButton>
          <ToggleButton
            value={4}
            size="sm"
            data-toggle="collapse"
            data-target="#collapseMultiplier"
            aria-expanded="false"
            aria-controls="collapseMultiplier"
          >
            Multiplier
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }

  perDayLeaderboard() {
    return (
      <div className="accordion" id="accordionLeaderboardTbl">
        {this.toggleButtons()}

        <div
          id="collapseProfit"
          className="collapse history show"
          aria-labelledby="headingProfit"
          data-parent="#accordionLeaderboardTbl"
        >
          <div className="row card-body">{this.resultTable()}</div>
        </div>
        <div
          id="collapsePayout"
          className="collapse history"
          aria-labelledby="headingPayout"
          data-parent="#accordionLeaderboardTbl"
        >
          <div className="row card-body">{this.resultTable()}</div>
        </div>
        <div
          id="collapseWagered"
          className="collapse history"
          aria-labelledby="headingWagered"
          data-parent="#accordionLeaderboardTbl"
        >
          <div className="row card-body">{this.resultTable()}</div>
        </div>
        <div
          id="collapseMultiplier"
          className="collapse history"
          aria-labelledby="headingMultiplier"
          data-parent="#accordionLeaderboardTbl"
        >
          <div className="row card-body">{this.resultTable()}</div>
        </div>
      </div>
    );
  }

  resultTable() {
    return (
      <Table striped bordered hover responsive>
        <thead className="thead-light btm-box-shadow">
          <tr>
            <th scope="col">GAME</th>
            <th scope="col">ID</th>
            <th scope="col">TIME</th>
            <th scope="col">PLAYER</th>
            <th scope="col">BET</th>
            <th scope="col">PREDICTION</th>
            <th scope="col">PROFIT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Panel Game</th>
            <td>1</td>
            <td>21:13:13</td>
            <td>
              <Icon.PersonFill /> user1
            </td>
            <td>0.116578</td>
            <td>LOSE</td>
            <td>- 2.155478</td>
          </tr>
          <tr>
            <th scope="row">Treasure Hunt</th>
            <td>2</td>
            <td>21:13:12</td>
            <td>
              <Icon.PersonFill /> user2
            </td>
            <td>1.54547</td>
            <td>WIN</td>
            <td>+ 1.155478</td>
          </tr>
          <tr>
            <th scope="row">Majhong</th>
            <td>3</td>
            <td>21:13:11</td>
            <td>
              <Icon.PersonFill /> user3
            </td>
            <td>0.54598</td>
            <td>WIN</td>
            <td>+ 2.155478</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  accordion() {
    return (
      <div className="w-100 mt-3" id="content">
        <div className="row">
          <div
            className="col-12 collapse history show mt-4"
            id="multiCollapseFirst"
          >
            <div className="card card-body btm-box-shadow">
              {this.perDayLeaderboard()}
            </div>
          </div>
          <div
            className="col-12 collapse history show mt-4"
            id="multiCollapseSecond"
          >
            <div className="card card-body btm-box-shadow">
              {/* <h4>History Page</h4> */}
              {this.resultTable()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  accordionNav() {
    return (
      <div className="col-12">
        <Button
          variant="primary"
          size="sm"
          type="button"
          data-toggle="collapse"
          data-target="#multiCollapseFirst"
          aria-expanded="false"
          aria-controls="multiCollapseFirst"
        >
          24 hrs
        </Button>{" "}
        <Button
          variant="primary"
          size="sm"
          type="button"
          data-toggle="collapse"
          data-target="#multiCollapseSecond"
          aria-expanded="false"
          aria-controls="multiCollapseSecond"
        >
          History
        </Button>
        {/* <button
          className="btn btn-sm"
          type="button"
          data-toggle="collapse"
          data-target=".multi-collapse"
          aria-expanded="false"
          aria-controls="multiCollapseFirst multiCollapseSecond"
        >
          Show All
        </button> */}
      </div>
    );
  }

  render(this) {
    return (
      <div className="container-fluid">
        <div
          className="alert alert-light mt-4 box-shadow text-md-left text-center"
          role="alert"
        >
          <div className="row">
            <div className="col-md-6 col-12 d-flex align-items-end">
              <h4 className="text-dark">Leader board</h4>
            </div>
            <div className="col-md-6 col-12">
              <div className="row text-md-right text-center">
                {this.accordionNav()}
              </div>
            </div>
          </div>
        </div>
        {this.accordion()}
      </div>
    );
  }
}

export default Leaderboard;
