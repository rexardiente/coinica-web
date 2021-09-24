import React, { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import TableRanking from "../Table";
import { translate } from "helpers/translate";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // borderBottom: "1px solid #e8e8e8",
    // backgroundColor: theme.palette.background.paper,
  },
}));

type Props = {
  data: Record<string, any>;
  selectedTab: string;
  onChangeTab: (e: ChangeEvent<{}>, value: any) => void;
};

const TabRanking = ({ data, selectedTab, onChangeTab }: Props) => {
  const classes = useStyles();
  const dataEntries = Object.entries(data);

  const renderTabTitle = () => {
    return (
      <TabList onChange={onChangeTab} aria-label="simple tabs example">
        {dataEntries.map((title) => (
          <Tab label={translate(`ranking.tab.${title[0]}`)} value={title[0]} />
        ))}
      </TabList>
    );
  };

  const renderTabContent = () => {
    const tableHead = [
      "#",
      translate("ranking.table.player") as unknown as string,
      translate("ranking.table.bets") as unknown as string,
    ];

    return dataEntries.map((data) => (
      <TabPanel value={data[0]} key={data[0]}>
        <TableRanking
          theadData={[
            ...tableHead,
            translate(`ranking.tab.${data[0]}`) as unknown as string,
          ]}
          tbodyData={data[1]}
        />
      </TabPanel>
    ));
  };
  return (
    <div className={classes.root}>
      <TabContext value={selectedTab}>
        {renderTabTitle()}
        {renderTabContent()}
      </TabContext>
    </div>
  );
};

export default TabRanking;
