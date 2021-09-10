import { ReactNode } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import styles from "./HowItWorks.module.scss";

type Props = {
  title?: string | ReactNode;
  instruction: string[] | ReactNode[];
};

const HowItWorks = ({ title, instruction }: Props) => {
  return (
    <div className={styles.container}>
      {title && <h3>{title}</h3>}

      <p>
        <InfoOutlinedIcon className={styles.iconInfo} />
        How It Works
      </p>
      <ol>
        {instruction.map((step) => (
          <li>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default HowItWorks;
