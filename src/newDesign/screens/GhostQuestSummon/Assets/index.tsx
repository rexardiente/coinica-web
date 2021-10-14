import { ServerAPI } from "Config";
import SummonBG from "./tempAssets/summon_bg.jpg";
import _SummonGhostText from "./tempAssets/summon_ghosts.png";
import _IceQueen from "./tempAssets/icequeen.png";
import _Orochi from "./tempAssets/orochi.png";
import _Tenko from "./tempAssets/tenko.png";
import _SummonDefaultBtn from "./tempAssets/summon_btn_default.png";
import _SummonHoveredtBtn from "./tempAssets/summon_btn_hovered.png";
const ASSETS_URL = ServerAPI.assets_url;

// temp assets
export const SummonBackground = SummonBG;
export const SummonGhostText = _SummonGhostText;
export const IceQueen = _IceQueen;
export const Orochi = _Orochi;
export const Tenko = _Tenko;
export const SummonDefaultBtn = _SummonDefaultBtn;
export const SummonHoveredtBtn = _SummonHoveredtBtn;

// Ghostlist
export const ModalBackground = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/modal_bg.png`;
export const InBattleActive = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/btn_in_battle_active.png`;
export const InBattleInactive = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/btn_in_battle_inactive.png`;
export const BattleEndActive = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/btn_battle_end_active.png`;
export const BattleEndInactive = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/btn_battle_end_inactive.png`;
export const BtnSort = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/btn_sort.png`;

// GhostRow
export const BtnDetails = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/btn_details.png`;
export const NewBadge = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_icons/new.png`;
export const StarIcon = `${ASSETS_URL}/imgs/games/ghost_quest/star.png`;

// Sort Modal
export const Background = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/sort_modal/bg_modal.png`;
export const OldestBtn = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/sort_modal/btn_oldest.png`;
export const NewestBtn = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/sort_modal/btn_newest.png`;
export const BLLowBtn = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/sort_modal/btn_battleLimitLowToHigh.png`;
export const BLHighBtn = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/sort_modal/btn_battleLimitHighToLow.png`;
export const StarLowBtn = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/sort_modal/btn_starLowToHigh.png`;
export const StarHighBtn = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/sort_modal/btn_starHighToLow.png`;
export const LifeLowBtn = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/sort_modal/btn_lifeLowToHigh.png`;
export const LifeHighBtn = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/sort_modal/btn_lifeHighToLow.png`;

// AUDIO ASSETS
export const GhostlistBGM = `${ASSETS_URL}/audio/games/ghostquest/GQ_GhostList.mp3`;
export const ClickSound = `${ASSETS_URL}/audio/games/ghostquest/GQ_Click.mp3`;
export const CancelSound = `${ASSETS_URL}/audio/games/ghostquest/GQ_BackCancel.mp3`;

// modals
export const ModalBtnCancel = `${ASSETS_URL}/imgs/games/ghost_quest/modals/btn_cancel.png`;

// summon
export const Summon_BG = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/background.png`;
export const BTN_1_ACTIVE = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/radiobtn_1_active.png`;
export const BTN_1_INACTIVE = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/radiobtn_1_inactive.png`;
export const BTN_10_ACTIVE = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/radiobtn_10_active.png`;
export const BTN_10_INACTIVE = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/radiobtn_10_inactive.png`;
export const BTN_50_ACTIVE  = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/radiobtn_50_active.png`;
export const BTN_50_INACTIVE = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/radiobtn_50_inactive.png`;
export const BTN_100_ACTIVE = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/radiobtn_100_active.png`;
export const BTN_100_INACTIVE = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/radiobtn_100_inactive.png`;
export const BTN_CONFIRM =  `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/btn_confirm.png`;
export const BTN_CANCEL = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/btn_cancel.png`;
export const BTN_SUMMON = `${ASSETS_URL}/imgs/games/ghost_quest/modals/summon/btn_summon.png`;
export const GhostDetailBackground = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_list/background.jpg`;

// autoplay
export const AUTOPLAY_BG = `${ASSETS_URL}/imgs/games/ghost_quest/modals/autoplay/background.png`;
export const BTN_AUTOPLAY = `${ASSETS_URL}/imgs/games/ghost_quest/modals/autoplay/btn_autoplay.png`;
export const BTN_START_AUTOPLAY = `${ASSETS_URL}/imgs/games/ghost_quest/modals/autoplay/btn_start autoplay.png`;
export const BTN_STOP_AUTOPLAY = `${ASSETS_URL}/imgs/games/ghost_quest/modals/autoplay/btn_stop_autoplay.png`;
export const BTN_NEXT = `${ASSETS_URL}/imgs/games/ghost_quest/modals/autoplay/btn_next.png`;
export const BTN_BACK = `${ASSETS_URL}/imgs/games/ghost_quest/modals/autoplay/btn_back.png`;
export const CHECKBOX_ON = `${ASSETS_URL}/imgs/games/ghost_quest/modals/autoplay/checkbox_on.png`;
export const CHECKBOX_OFF = `${ASSETS_URL}/imgs/games/ghost_quest/modals/autoplay/checkbox_off.png`;

export const SUMMON_BLUE = `${ASSETS_URL}/imgs/games/ghost_quest/gacha_animations/new/SummonBlue.gif`;
export const SUMMON_GOLD = `${ASSETS_URL}/imgs/games/ghost_quest/gacha_animations/new/SummonGold.gif`;
export const SUMMON_RED = `${ASSETS_URL}/imgs/games/ghost_quest/gacha_animations/new/SummonRed.gif`;

export const SUMMON_STAR = `${ASSETS_URL}/imgs/games/ghost_quest/star.png`;
export const GhostBackground = `${ASSETS_URL}/imgs/games/ghost_quest/ghost_icons/bg_character.png`;

// AUDIO ASSETS
export const GQ_MAIN_SOUND = `${ASSETS_URL}/audio/games/ghostquest/GQ_Main.mp3`;
export const AutoPlaySound = `${ASSETS_URL}/audio/games/ghostquest/GQ_AutoPlay.mp3`;
export const GQ_SUMMON_SOUND = `${ASSETS_URL}/audio/games/ghostquest/GQ_Summon.mp3`;
export const funcSound = `${ASSETS_URL}/audio/games/ghostquest/GQ_Function.mp3`;
export const selectSound = `${ASSETS_URL}/audio/games/ghostquest/GQ_Select.mp3`;
export const confirmSound = `${ASSETS_URL}/audio/games/ghostquest/GQ_Confirm.mp3`;
export const cancelSound = `${ASSETS_URL}/audio/games/ghostquest/GQ_BackCancel.mp3`;
export const inputSound = `${ASSETS_URL}/audio/games/ghostquest/GQ_Input.mp3`;
export const PlaySound = `${ASSETS_URL}/audio/games/ghostquest/GQ_PlayStart.mp3`;
export const GQ_Star1to3 = `${ASSETS_URL}/audio/games/ghostquest/GQ_Star1to3.mp3`;
export const GQ_Star4to5 = `${ASSETS_URL}/audio/games/ghostquest/GQ_Star4to5.mp3`;