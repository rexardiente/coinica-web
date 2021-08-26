import React, { PureComponent } from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  ToggleButtonProps,
} from "react-bootstrap";
import "./ButtonToggle.scss";

type Props = {
  opts: Array<{ value: ToggleButtonProps["value"]; label: React.ReactNode }>;
  defaultValue: ToggleButtonProps["value"];
  onToggle: (val: any) => void;
};
class ButtonToggle extends PureComponent<Props> {
  render() {
    const { opts, defaultValue, onToggle } = this.props;
    return (
      <div className="btn-toggle">
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue={defaultValue}
          onChange={onToggle}
        >
          {opts.map((opt) => (
            <ToggleButton
              key={opt.value as string}
              value={opt.value}
              variant="light"
            >
              {opt.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    );
  }
}

export default ButtonToggle;
