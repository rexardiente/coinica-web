import React, { PureComponent } from "react";
import { Nav, Tab } from "react-bootstrap";
import Table from "../Table";
import "./Tab.scss";
import { translate } from "helpers/translate";

type Props = {
  rankingData: { [key: string]: Array<{ [key: string]: any }> };
};

class TabRanking extends PureComponent<Props> {
  renderContent() {
    const { rankingData } = this.props;
    const tabTables = Object.entries(rankingData);
    const tableHead = ["#", translate("ranking.table.player"), translate("ranking.table.bets")];

    return tabTables.map((data, index) => (
      <Tab.Pane eventKey={data[0]} key={index}>
        <Table
          thRowData={[...tableHead, translate(`ranking.tab.${data[0]}`)]}
          tbRowData={data[1]}
        />
      </Tab.Pane>
    ));
  }

  render() {
    const { rankingData } = this.props;
    const tabTitles = Object.keys(rankingData);

    return (
      <Tab.Container defaultActiveKey={tabTitles[0]}>
        <div className="col-12 tab-nav-wrapper">
          <Nav className="flex-row">
            {tabTitles.map((title, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={title}>
                  {translate(`ranking.tab.${title}`)}
                </Nav.Link>
                <div className="border-bottom-active"></div>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <div className="col-12 pt-4 tab-content-wrapper px-0">
          <Tab.Content>{this.renderContent()}</Tab.Content>
        </div>
      </Tab.Container>
    );
  }
}

export default TabRanking;
