import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import useSound from "use-sound";
import { ClickSound } from "../Assets";
import styles from "./Header.module.scss";

// assets
import {
  BtnHome,
  BtnList,
  BtnRanking,
  BtnSummon
} from "../Assets";

const Header = (props) => {
  const user_game_id = props.platform?.account?.user_game_id || null
  const GQ_VOLUME = props?.ghost_quest?.volume
  const [playClick] = useSound(ClickSound, { volume: 0.5 * GQ_VOLUME })

  const HomeHandler = () => {
    playClick()
    if (props.history) {
      props.history.push("/game/ghostquest")
    }
  }
  const ListHander = () => {
    playClick()
    if (props.history) {
      props.history.push("/game/ghostquest/ghostlist")
    }
  }
  const SummonHandler = () => {
    playClick()
    if (props.showSummon && typeof props.showSummon === "function") {
      props.showSummon()
    }
    // if (props.showSummon && user_game_id) {
    //   props.showSummon(true)
    // } else if (user_game_id == null) {
    //   toast.error('Please login your scatter wallet first')
    // }
  }
  const RankingHandler = () => {
    playClick()
    if (props.history) {
      props.history.push("/game/ghostquest/ranking")
    }
  }
  return (
    <>
      <img src={BtnHome} alt="Home" className={`${styles.header_home_btn}`} onClick={() => HomeHandler()} />
      <img src={BtnRanking} alt="Ranking" className={`${styles.header_ranking_btn}`} onClick={() => RankingHandler()} />
      <img src={BtnSummon} alt="Summon" className={`${styles.header_summon_btn}`} onClick={() => SummonHandler()} />
      <img src={BtnList} alt="GhostList" className={`${styles.header_list_btn}`} onClick={() => ListHander()} />
    </>
  )
}

const mapStateToProps = ({ ghost_quest, platform }) => ({ ghost_quest, platform });
export default connect(mapStateToProps)(Header);
