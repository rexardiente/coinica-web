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
import styles from "./Table.module.scss";

type Props = {
  theadData: string[];
  tbodyData: Record<string, any>[];
};

const TableRanking = ({ theadData, tbodyData }: Props) => {
  const rows = () => {
    if (!tbodyData.length) {
      return (
        <TableRow>
          <TableCell colSpan={theadData.length} className={styles.emptyData}>
            {translate("misc.noAvailableData")}
          </TableCell>
        </TableRow>
      );
    }

    const rowKey = tbodyData.length && Object.keys(tbodyData[0]);
    return tbodyData.map((row, index) => (
      <TableRow key={index}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{row[rowKey[1]] || "---"}</TableCell>
        <TableCell align="center">{row[rowKey[2]]}</TableCell>
        <TableCell align="center">{row[rowKey[3]]}</TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer className={styles.container} component={Paper}>
      <Table className={styles.table} aria-label="leader-board-table">
        <TableHead>
          <TableRow>
            {theadData.map((head) => (
              <TableCell align="center">{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{rows()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableRanking;
