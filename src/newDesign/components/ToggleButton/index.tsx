import { MouseEvent } from "react";
import { makeStyles } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  toggle: {
    height: "44px",
    backgroundColor: "#1785eb",
    padding: "3px",
    borderRadius: "0",
    "& .MuiButtonBase-root": {
      color: "#161e2f",
      backgroundColor: "#1785eb",
      borderRadius: "0",
      textTransform: "capitalize",
      fontWeight: "700",
    },
    "& .Mui-selected": {
      color: "#1785eb",
      backgroundColor: "#161e2f",
      pointerEvents: "none",

      "&:hover": {
        backgroundColor: "#161e2f",
      },
    },
  },
}));

type Option = { label: string; value: string };
type Props = {
  value: string;
  options: Option[];
  onChange: (e: MouseEvent<HTMLElement>, value: any) => void;
  className?: string;
};

const SwitchButton = ({ value, options, onChange, className }: Props) => {
  const classes = useStyles();

  return (
    <ToggleButtonGroup
      className={[classes.toggle, className].join(" ")}
      value={value}
      onChange={onChange}
      exclusive={true}
    >
      {options.length &&
        options.map(({ label, value }, index) => (
          <ToggleButton value={value} aria-label={label} key={index}>
            {label}
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
};

export default SwitchButton;
