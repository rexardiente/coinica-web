import { ServerAPI } from "Config";

const ASSETS_URL = ServerAPI.assets_url;

//Tile
export const ura = `${ASSETS_URL}/imgs/games/mahjong_1/mahjong_tiles/ura.png`;

//Menu
export const btn_menu = `${ASSETS_URL}/imgs/games/mahjong_1/gameplay/btn_menu.png`;

//HiLo
export const icon_arrow = `${ASSETS_URL}/imgs/games/mahjong_1/gameplay/arrow.png`;
export const icon_equals = `${ASSETS_URL}/imgs/games/mahjong_1/gameplay/equals.png`;
export const btn_bg_high = `${ASSETS_URL}/imgs/games/mahjong_1/gameplay/btn_bg_high.png`;
export const btn_bg_draw = `${ASSETS_URL}/imgs/games/mahjong_1/gameplay/btn_bg_draw.png`;
export const btn_bg_low = `${ASSETS_URL}/imgs/games/mahjong_1/gameplay/btn_bg_low.png`;

//sounds
export const sounds = {
  deposit: `${ASSETS_URL}/audio/games/mahjong/deposit.mp3`,
  withdraw: `${ASSETS_URL}/audio/games/mahjong/withdraw.mp3`,
  transfer: `${ASSETS_URL}/audio/games/mahjong/transfer.mp3`,
  playHilo: `${ASSETS_URL}/audio/games/mahjong/playhilo.mp3`,
  mjGameMainBg_1: `${ASSETS_URL}/audio/games/mahjong/mh_gamebgm01.mp3`,
  mjGameMainBg_2: `${ASSETS_URL}/audio/games/mahjong/mh_gamebgm02.mp3`,
  mjGameMainBg_3: `${ASSETS_URL}/audio/games/mahjong/mh_gamebgm03.mp3`,
  mjPlayAgainBg: `${ASSETS_URL}/audio/games/mahjong/mh_playagainbgm.mp3`,
  high: `${ASSETS_URL}/audio/games/mahjong/high.mp3`,
  draw: `${ASSETS_URL}/audio/games/mahjong/draw.mp3`,
  low: `${ASSETS_URL}/audio/games/mahjong/low.mp3`,
  win: `${ASSETS_URL}/audio/games/mahjong/win.mp3`,
  lose: `${ASSETS_URL}/audio/games/mahjong/lose.mp3`,
  error: `${ASSETS_URL}/audio/games/mahjong/error.mp3`,
  playAgain: `${ASSETS_URL}/audio/games/mahjong/start_game.mp3`,
  playCompleteHand: `${ASSETS_URL}/audio/games/mahjong/completehand.mp3`,
  playKong: `${ASSETS_URL}/audio/games/mahjong/kong.mp3`,
  playPass: `${ASSETS_URL}/audio/games/mahjong/pass.mp3`,
};
