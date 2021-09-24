import { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import { translate } from "helpers/translate";
import styles from "./IncomeHistory.module.scss";
import stylesMain from "../Referral.module.scss";

type history = {
  created_at: Date | number;
  applied_by: string;
};

type Props = {
  data: history[];
};

const Benefits = ({ data }: Props) => {
  const rows = () => {
    if (!data.length) {
      return (
        <TableRow>
          <TableCell colSpan={3} className={styles.emptyData}>
            {translate("misc.noAvailableData")}
          </TableCell>
        </TableRow>
      );
    }

    return data.map((row, index) => (
      <TableRow key={index}>
        <TableCell align="center">
          {new Date(row.created_at).toLocaleDateString("en-US")}
        </TableCell>
        <TableCell align="center">
          {new Date(row.created_at).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </TableCell>
        <TableCell align="center">{row.applied_by}</TableCell>
      </TableRow>
    ));
  };
  return (
    <Fragment>
      <Typography component="h2" className={stylesMain.heading}>
        {translate("referral.history")}
      </Typography>
      <TableContainer className={styles.container} component={Paper}>
        <Table className={styles.table} aria-label="benefits table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {translate("referral.history.date")}
              </TableCell>
              <TableCell align="center">
                {translate("referral.history.time")}
              </TableCell>
              <TableCell align="center">
                {translate("referral.history.referent")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows()}</TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default Benefits;
