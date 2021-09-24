import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { translate } from "helpers/translate";
import styles from "./LeaderBoardTable.module.scss";

type LeaderBoard = {
  playerName: string;
  bets: number;
  wagered: number;
  ratio: number;
  points: number;
};

type Props = {
  data: LeaderBoard[];
};

const Benefits = ({ data }: Props) => {
  const rows = () => {
    if (!data.length) {
      return (
        <TableRow>
          <TableCell colSpan={6} className={styles.emptyData}>
            {translate("misc.noAvailableData")}
          </TableCell>
        </TableRow>
      );
    }

    return data.map((row, index) => (
      <TableRow key={index}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{row.playerName || "---"}</TableCell>
        <TableCell align="center">{row.bets}</TableCell>
        <TableCell align="center">{row.wagered}</TableCell>
        <TableCell align="center">{row.ratio}</TableCell>
        <TableCell align="center">{row.points}</TableCell>
      </TableRow>
    ));
  };
  return (
    <TableContainer className={styles.container} component={Paper}>
      <Table className={styles.table} aria-label="leader-board-table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              {translate("challenge.table.rank")}
            </TableCell>
            <TableCell align="center">
              {translate("challenge.table.player")}
            </TableCell>
            <TableCell align="center">
              {translate("challenge.table.bets")}
            </TableCell>
            <TableCell align="center">
              {translate("challenge.table.payouts")}
            </TableCell>
            <TableCell align="center">
              {translate("challenge.table.ratio")}
            </TableCell>
            <TableCell align="center">
              {translate("challenge.table.vip_points")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default Benefits;
