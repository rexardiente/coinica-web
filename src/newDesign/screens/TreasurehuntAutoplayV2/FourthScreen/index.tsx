import React from "react";
import classes from "../TreasurehuntAutoplayV2.module.scss";
import { translate } from "helpers/translate";
// import { ChangeButton } from "../Assets";
import { ChangeBtn } from "../Assets/SvgAssets";

// dict for change btn
let change_btn_values = {
  1: 1,
  2: 1,
  3: 2,
  4: 2,
  5: 3,
};

const IndexToLetter = (index) => {
  const isCapital = true;
  return String.fromCharCode(index + (isCapital ? 65 : 97));
};

type FourthScreenProps = {
  steps: any[];
  setStep: Function;
  firstScreenState: any;
  secondScreenState: any;
  thirdScreenState: any;
  language: any;
};

const FourthScreen = ({
  steps,
  setStep,
  firstScreenState,
  secondScreenState,
  thirdScreenState,
  language,
}: FourthScreenProps) => {
  const { destination, rivals } = firstScreenState;
  const { numOfPanelsToOpen, orderOfPanelsToOpen } = secondScreenState;
  const { gamesPlayed, minBalance, maxBalance } = thirdScreenState;
  const panelsToOpenInLetters: any[] = [];

  if (orderOfPanelsToOpen.length > 0) {
    for (const index of orderOfPanelsToOpen) {
      panelsToOpenInLetters.push(IndexToLetter(index));
    }
  }

  return (
    <div className={classes.confirmation_container}>
      <div className="d-flex flex-column w-100 mb-5">
        <div className="col-12 mt-2 text-center">
          <h2 className="text_th_primary">
            {translate("th.autoplay.step6.text")}
          </h2>
        </div>
        {steps.map((data) => {
          if (data.step === 0 || data.step === 6) return null;
          return (
            <div className={classes.conf_stepContainer} key={data.step}>
              <div>
                <span
                  className="text_th_primary mr-0"
                  style={{ fontSize: "1.25rem", paddingRight: "15px" }}
                >
                  {data.step}
                </span>
                <span>{data.title}</span>
                <span style={{ position: "absolute", right: "-50px" }}>
                  {data.step === 1 ? (
                    <span className="step_information">{destination} {translate("th.autoplay.token_label")}</span>
                  ) : null}

                  {data.step === 2 ? (
                    <span className="step_information">{rivals}</span>
                  ) : null}

                  {data.step === 3 ? (
                    <span className="step_information">
                      {numOfPanelsToOpen}
                    </span>
                  ) : null}

                  {data.step === 4 ? (
                    <span className="step_information">
                      {JSON.stringify(panelsToOpenInLetters).replace(/"/g, " ")}
                    </span>
                  ) : null}

                  {data.step === 5 ? (
                    <div style={{ textAlign: "end" }}>
                      {gamesPlayed.selected && gamesPlayed.value > 0 && (
                        <div>{translate("th.autoplay.max_num_games")}: {gamesPlayed.value} </div>
                      )}
                      {minBalance.selected && minBalance.value > 0 && (
                        <div>
                          {translate("th.autoplay.reach_min_bal")}: {minBalance.value} {translate("th.autoplay.token_label")}{" "}
                        </div>
                      )}
                      {maxBalance.selected && maxBalance.value > 0 && (
                        <div>
                          {translate('th.autoplay.reach_max_bal')}: {maxBalance.value} {translate("th.autoplay.token_label")}{" "}
                        </div>
                      )}
                    </div>
                  ) : null}
                </span>
                <span
                  className={classes.change_btn}
                  onClick={() => setStep(change_btn_values[data.step])}
                >
                  <ChangeBtn language={language} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FourthScreen;
