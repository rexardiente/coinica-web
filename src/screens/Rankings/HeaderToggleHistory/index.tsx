import React, { PureComponent } from "react";
import { icon_rank } from "../Assets";
import ButtonToggle from "components/ButtonToggle";
import { translate } from "helpers/translate";

type Props = {
  onToggle: (val: any) => void;
};

class HeaderToggleHistory extends PureComponent<Props> {
  render() {
    const { onToggle } = this.props;
    const opts = [
      { value: "history", label: translate("ranking.history.button") },
      { value: "24", label: translate("ranking.hours.button") },
    ];
    return (
      <div className="col-12 d-inline-flex justify-content-between px-0">
        <div className="icon-star d-flex align-items-center">
          <img src={icon_rank} alt="icon" width="32" height="32" />{" "}
          <span>{translate("ranking.title")}</span>
        </div>
        <ButtonToggle
          opts={opts}
          defaultValue={opts[0].value}
          onToggle={onToggle}
        />
      </div>
    );
  }
}

export default HeaderToggleHistory;
