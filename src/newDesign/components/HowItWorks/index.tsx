import { ReactNode } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { translate } from "helpers/translate";
import styles from "./HowItWorks.module.scss";

type Props = {
  title?: string | ReactNode;
  instruction: string[] | ReactNode[];
  className?: string | string[];
};

const HowItWorks = ({ title, instruction, className }: Props) => {
  return (
    <div className={[styles.container, className].join(" ")}>
      {title && <h3>{title}</h3>}

      <p>
        <InfoOutlinedIcon className={styles.iconInfo} />
        {translate("misc.howItWorks")}
      </p>
      <ol>
        {instruction.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default HowItWorks;
