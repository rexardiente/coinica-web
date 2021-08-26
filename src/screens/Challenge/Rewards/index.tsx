import React from "react";
import { translate } from "helpers/translate";
import "./Rewards.scss";

const Rewards: React.FC<{ rewardSet: Array<any> | undefined }> = ({
  rewardSet,
}) => {
  return (
    <div className="gray p-5 rounded">
      <h5 className="text-muted">{translate("challenge.payout.title")}</h5>
      <div className="d-flex flex-wrap px-0 pt-3">
        {rewardSet?.map((reward) => (
          <div className="col-6 col-md-3 mt-2 px-0">
            <span className="small text-secondary">
              {translate("challenge.payout.reward")} {reward.id}:
            </span>
            <h6>
              {reward.min} {reward.max ? "- " + reward.max : ""}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
