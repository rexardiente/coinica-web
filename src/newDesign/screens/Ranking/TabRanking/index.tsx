import { ChangeEvent } from "react";
import { Tab, makeStyles } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import TableRanking from "../Table";
import { translate } from "helpers/translate";
import styles from "./Tabs.module.scss";

type Props = {
  data: Record<string, any>;
  selectedTab: string;
  onChangeTab: (e: ChangeEvent<{}>, value: any) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderBottom: "2px solid #405680",
    "& .Mui-selected": {
      color: theme.palette.primary.main,
    },
    "& .PrivateTabIndicator-colorPrimary-21": {
      height: 4,
    },
  },
}));

const TabRanking = ({ data, selectedTab, onChangeTab }: Props) => {
  const classes = useStyles();
  const dataEntries = Object.entries(data);

  const renderTabTitle = () => {
    return (
      <TabList
        onChange={onChangeTab}
        aria-label="ranking tab"
        className={[classes.root, styles.tabListHeader].join(" ")}
        indicatorColor="primary"
      >
        {dataEntries.map((title, index) => (
          <Tab label={translate(`ranking.tab.${title[0]}`)} value={title[0]} key={index}/>
        ))}
      </TabList>
    );
  };

  const renderTabContent = () => {
    const tableHead = [
      translate("ranking.table.rank") as unknown as string,
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
    <div className={styles.container}>
      <TabContext value={selectedTab}>
        {renderTabTitle()}
        {renderTabContent()}
      </TabContext>
    </div>
  );
};

export default TabRanking;
