import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
import { toast } from "react-toastify";
import { updateTreasurehuntData } from "services/api/server/treasurehunt_api";

// Assets
import {
  BG_MAP,
  SelectDestination,
  BtnRules,
  BtnTutorial,
  BtnAutoPlay,
  DefaultPirate,
  AudioDestinationA,
  AudioDestinationB,
  AudioDestinationC,
  AudioTHsys1,
  AudioTHsysNo,
} from "./Assets"
import { TutorialBtn, RulesBtn, AutoplayBtn, SelectDestinationText } from "./Assets/SvgAssets";
import "./Treasurehunt.scss";

// Components
import TreasurehuntDestinationOption from "components/TreasurehuntDestinationOption";
import GameHistory from "components/GameHistoryComponent";
import TutorialModal from "components/TreasurehuntTutorial";
import RulesModal from "components/TreasurehuntRules";

const AVAILABLE_DESTINATIONS = [1, 10, 20]

const TreasureHunt = (props) => {
  const { account, language } = props.platform
  const user_game_id = account?.user_game_id
  // const treasurehuntData = props.treasurehunt

  const [showTutorial, setShowTutorial] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [optionHovered, setOptionHovered] = useState(0)

  const [playDestinationA] = useSound(AudioDestinationA, { volume: 0.5 })
  const [playDestinationB] = useSound(AudioDestinationB, { volume: 0.5 })
  const [playDestinationC] = useSound(AudioDestinationC, { volume: 0.5 })
  const [playTHsys1] = useSound(AudioTHsys1, { volume: 0.5 })
  const [playSysNo] = useSound(AudioTHsysNo, { volume: 0.5 })

  useEffect(() => {
    if (account && user_game_id) {
      updateTreasurehuntData(user_game_id)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const _setDestinaton = async (val) => {
    switch (val) {
      case  1: playDestinationA(); break
      case 10: playDestinationB(); break
      case 20: playDestinationC(); break
      default: break
    }
    props.history.push("/game/treasurehunt/gameplay", { selectedDestination: val })
  }

  return (
    <Fragment>
      <TutorialModal
        state={showTutorial}
        setState={(bool) => setShowTutorial(bool)}
      />
      <RulesModal
        state={showRules}
        setState={(bool) => setShowRules(bool)}
      />
      <div
        id="treasure-hunt-main"
        className="row"
        style={{
          background: `
            linear-gradient(
              rgba(0, 0, 0, 0.5), 
              rgba(0, 0, 0, 0.5)
            ),
            url(${BG_MAP})
          `
        }}
      >
        <div className="col-12 text-center mt-5 pt-5">
          <img src={DefaultPirate} alt="" className="img-fluid" />
        </div>
        <div className="col-12 mt-2 text-center">
          <div id="select-destination">
            <SelectDestinationText language={language} />
          </div>
          <div className="row justify-content-center">
            {AVAILABLE_DESTINATIONS.map((val) => (
              <TreasurehuntDestinationOption
                key={val}
                number={val}
                optionHovered={optionHovered}
                setOptionHovered={(optionHovered) =>
                  setOptionHovered(optionHovered)
                }
                func={() => _setDestinaton(val)}
              />
            ))}
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <div
                className="btn m-2 th-buttons"
                onClick={() => {
                  playTHsys1()
                  setShowTutorial(true)
                }}
              >
                <TutorialBtn language={language} />
              </div>
              <div
                className="btn m-2 th-buttons"
                onClick={() => {
                  playTHsys1()
                  setShowRules(true)
                }}
              >
                <RulesBtn language={language}  />
              </div>
              <div
                className="btn m-2 th-buttons"
                onClick={() => {
                  if (user_game_id == null || account == null) {
                    playSysNo()
                    toast.warn('Please log in you scatter wallet first')
                    return
                  } else {
                    playTHsys1()
                    props.history.push("/game/treasurehunt/autoplay")
                  }
                }}
              >
                <AutoplayBtn language={language} />
              </div>
            </div>
          </div>
        </div>
        {/* <Recent history={history} /> */}
      </div>
      <GameHistory game={"treasurehunt"} />
    </Fragment>
  );
}

const mapStateToProps = ({ platform, treasurehunt }) => ({ platform, treasurehunt });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(TreasureHunt);
