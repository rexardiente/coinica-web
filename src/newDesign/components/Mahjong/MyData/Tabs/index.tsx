import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { translate } from "helpers/translate";
import HiLoWins from "./HiLoWins";
import MahjongWins from "./MahjongWins";
import styles from "./Tabs.module.scss";

type TabsWinProps = {
  data: {
    hiloWinRate: number;
    maxPayout: number;
    consHilo: number;
    shortestRound: number;
    avgWinScore: number;
    avgWinRound: number;
  };
};

type TabPanelProps = {
  children?: React.ReactNode;
  className?: string;
  index: any;
  value: any;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, className, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className={className}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },

  tabRoot: {
    minHeight: 24,
    marginLeft: 10,
    "& .MuiButtonBase-root, ~ div": {
      border: "2px solid #FFF9D1",
      boxShadow: "0px 0px 6px #81765F",
    },
    "& ~ div": {
      borderRadius: 10,
      padding: 15,
    },
    "& .MuiButtonBase-root": {
      backgroundColor: "#FBEED4",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      padding: 6,
      minHeight: 24,

      "&:not(:last-of-type)": {
        marginRight: 10,
      },
      "&.Mui-selected": {
        background: "linear-gradient(180.33deg, #F9A226 0.28%, #DB743B 22.48%)",
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
  },
}));

const TabsWin = ({
  data: {
    maxPayout,
    hiloWinRate,
    consHilo,
    shortestRound,
    avgWinScore,
    avgWinRound,
  },
}: TabsWinProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="my data"
        className={classes.tabRoot}
      >
        <Tab label={translate("mj.my_data.hilo.button")} {...a11yProps(0)} />
        <Tab label={translate("mj.my_data.mahjong.button")} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} className={styles.tabPanel}>
        <HiLoWins
          shortestRound={shortestRound}
          avgWinRound={avgWinRound}
          avgWinScore={avgWinScore}
        />
      </TabPanel>
      <TabPanel value={value} index={1} className={styles.tabPanel}>
        <MahjongWins
          hiloWinRate={hiloWinRate}
          maxPayout={maxPayout}
          consHilo={consHilo}
        />
      </TabPanel>
    </div>
  );
};

export default TabsWin;
