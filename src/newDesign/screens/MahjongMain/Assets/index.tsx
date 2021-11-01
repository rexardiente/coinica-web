import { ServerAPI } from "Config";
const ASSETS_URL = ServerAPI.assets_url;

export const logo = `${ASSETS_URL}/imgs/games/mahjong_1/home_screen/mj_logo.png`;
export const bgGirl = `${ASSETS_URL}/imgs/games/mahjong_1/home_screen/girl_bg.png`;
export const iconTutorial = `${ASSETS_URL}/imgs/games/mahjong_1/home_screen/icon_help.png`;
export const iconSettings = `${ASSETS_URL}/imgs/games/mahjong_1/home_screen/icon_settings.png`;
export const iconMyData = `${ASSETS_URL}/imgs/games/mahjong_1/home_screen/icon_mydata.png`;
export const iconGamesClose = `${ASSETS_URL}/imgs/games/mahjong_1/home_screen/icon_close.png`;

//sounds
export const sounds = {
  startGame: `${ASSETS_URL}/audio/games/mahjong/start_game.mp3`,
  option: `${ASSETS_URL}/audio/games/mahjong/option.mp3`,
  back: `${ASSETS_URL}/audio/games/mahjong/back.mp3`,
  mjHomeMainBg: `${ASSETS_URL}/audio/games/mahjong/mh_top_bgm.mp3`,
};
