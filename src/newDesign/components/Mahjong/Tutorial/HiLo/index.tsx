import { translate } from "helpers/translate";
import styles from "../Tutorial.module.scss";

const Hilo = () => {
  return (
    <>
      <div className={styles.title}>
        1. {translate("mj.tutorial.hilo.title")}
      </div>
      <div className={styles.paragraph}>
        <p>{translate("mj.tutorial.hilo.p1")}</p>

        <p>
          {translate("mj.tutorial.hilo.p2", {
            span: (content) => (
              <span className={styles.fontWeight_900}> {content} </span>
            ),
          })}
        </p>

        <p className={styles.fontWeight_900}>
          {translate("mj.tutorial.hilo.p3")}
        </p>
        <p>{translate("mj.tutorial.hilo.p4")}</p>

        <p>{translate("mj.tutorial.hilo.p5")}</p>

        <p>{translate("mj.tutorial.hilo.p6")}</p>

        <div className="table-responsive-sm">
          <table className={styles.tableOddsCalculation} cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>{translate("mj.tutorial.table.header_high")}: 64/135</th>
                <th>{translate("mj.tutorial.table.header_draw")}: 11/135</th>
                <th>{translate("mj.tutorial.table.header_low")}: 60/135</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{translate("mj.tutorial.table.body_rate")}</td>
                <td>47%</td>
                <td>8%</td>
                <td>44%</td>
              </tr>
              <tr>
                <td>{translate("mj.tutorial.table.body_deduct")}</td>
                <td>2.11*0.9</td>
                <td>12.3*</td>
                <td>2.24*0.9*</td>
              </tr>
              <tr>
                <td>{translate("mj.tutorial.table.body_odds")}</td>
                <td>1.89</td>
                <td>11.0</td>
                <td>2.03</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Hilo;
