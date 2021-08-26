import { combineReducers } from "redux";
import ghost_quest from "./ghost_quest/ghost_quest_reducer";
import mahjong_hilo from "./mahjong_hilo/mahjong_hilo_reducer";
import platform from "./platform/platform_reducer";
import scatter from "./scatter/scatter_reducer";
import treasurehunt from "./treasurehunt/treasurehunt_reducer";
import walletExt from "./wallet/wallet_reducer";

export default combineReducers({
  ghost_quest,
  mahjong_hilo,
  platform,
  scatter,
  treasurehunt,
  walletExt,
});
