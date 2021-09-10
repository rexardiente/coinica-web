import { ReactNode } from "react";
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
import { benefits_row } from "../temp_data";
import styles from "./Benefits.module.scss";

type rowType = string | ReactNode;
type BenefitsRow = {
  benefits: rowType;
  bronze: rowType;
  silver: rowType;
  gold: rowType;
};

const Benefits = () => {
  const rows: BenefitsRow[] = benefits_row;
  return (
    <TableContainer className={styles.container} component={Paper}>
      <Table className={styles.table} aria-label="benefits table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              {translate("vip.benefits_head.vip_benefits")}
            </TableCell>
            <TableCell align="center">
              {translate("vip.benefits_head.bronze")}
            </TableCell>
            <TableCell align="center">
              {translate("vip.benefits_head.silver")}
            </TableCell>
            <TableCell align="center">
              {translate("vip.benefits_head.gold")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.benefits}</TableCell>
              <TableCell align="center">{row.bronze}</TableCell>
              <TableCell align="center">{row.silver}</TableCell>
              <TableCell align="center">{row.gold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Benefits;
