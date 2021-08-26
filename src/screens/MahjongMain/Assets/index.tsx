import { ServerAPI } from "Config";
const ASSETS_URL = ServerAPI.assets_url;

// logo
export const logo = `${ASSETS_URL}/imgs/games/mahjong_1/home_screen/mj_logo.png`;

// girl
export const bgGirl = `${ASSETS_URL}/imgs/games/mahjong_1/home_screen/girl_bg.png`;

//sounds
export const sounds = {
  startGame: `${ASSETS_URL}/audio/games/mahjong/start_game.mp3`,
  option: `${ASSETS_URL}/audio/games/mahjong/option.mp3`,
  back: `${ASSETS_URL}/audio/games/mahjong/back.mp3`,
  mjHomeMainBg: `${ASSETS_URL}/audio/games/mahjong/mh_top_bgm.mp3`,
}
