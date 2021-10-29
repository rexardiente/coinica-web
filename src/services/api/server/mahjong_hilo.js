import axios from "axios";
import { ServerAPI as api } from "Config";
import { getHeaderParams } from "services/auth";
import { store } from "redux/store";
import { setMahjongHiloData } from "redux/mahjong_hilo/mahjong_hilo_actions";

const BASE_URL = `${api.protocol}://${api.host}/donut/api/v1`;
const MJ_URL = `${api.protocol}://${api.host}/donut/api/v1/game/mahjong-hilo`;
const game_id = "74cd374c-6126-495a-a8a3-33db87caa511";

export const MJ_ACTION_GET_TABLE = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/game/data`, { headers });
};

export const MJ_WITHDRAW_TOKEN = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/withdraw`, { headers });
};

export const MJ_TRANSFER_TOKEN = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/transfer`, { headers });
};

export const MJ_BET_TOKEN = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/start-game`, { headers });
};

export const MJ_ADD_BET = ({ currency, quantity }) => {
  const headers = getHeaderParams();
  const data = { currency, quantity };
  return axios.post(`${MJ_URL}/add/bet`, data, { headers });
};

export const MJ_ACTION_END = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/end`, { headers });
};

export const MJ_ACTION_RESET_GAME = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/reset-bet`, { headers });
};

export const MJ_START_GAME = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/init`, { headers });
};

export const MJ_PLAY_HILO = ({ option }) => {
  const headers = getHeaderParams();
  const data = { option };
  return axios.post(`${MJ_URL}/play-hilo`, data, { headers });
};

export const MJ_DISCARD_TILE = ({ idx }) => {
  const headers = getHeaderParams();
  const data = { tile: idx };
  return axios.post(`${MJ_URL}/discard-tile`, data, { headers });
};

export const MJ_DECLARE_KONG = ({ array_idx }) => {
  const headers = getHeaderParams();
  const data = { sets: array_idx };
  return axios.post(`${MJ_URL}/declare/kong`, data, { headers });
};

export const MJ_DCLR_WIN_HAND = ({ id }) => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/declare/win-hand`, { headers });
};

export const updateMahjongHiloData = async (id) => {
  const table = (await MJ_ACTION_GET_TABLE(id)).data;
  console.log(table);

  // await GET_BALANCE(id);
  if (table !== []) {
    store.dispatch(setMahjongHiloData(table));
  } else {
    store.dispatch(
      setMahjongHiloData({
        game_data: null,
        id: null,
      })
    );
  }
};

export const MJ_RESET_BET = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/reset-bet`, { headers });
};

export const MJ_HISTORY = (id) => {
  const headers = getHeaderParams();
  return axios.get(`${BASE_URL}/game/all/history/${game_id}/${id}`, {
    headers,
  });
};

export const MJ_GET_MONTHLY_RANKING = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/ranking/monthly`, { headers });
};

export const MJ_GET_MAX_PAYOUT = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/max-payout`, { headers });
};

export const MJ_GET_CONSECUTIVE_HILO = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/consecutive-hilo`, { headers });
};

export const MJ_GET_TOTAL_HILO_PLAYED = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/total-hilo-played`, { headers });
};

export const MJ_GET_HILO_WINRATE = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/hilo-winrate`, { headers });
};

export const MJ_GET_SHORTEST_ROUND = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/shortest-win-round`, { headers });
};

export const MJ_GET_AVG_WIN_SCORE = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/hilo-avg-win-score`, { headers });
};

export const MJ_GET_AVG_WIN_ROUND = () => {
  const headers = getHeaderParams();
  return axios.get(`${MJ_URL}/hilo-avg-win-round`, { headers });
};

// GET  	/donut/api/v1/game/mahjong-hilo/game/data
// GET  	/donut/api/v1/game/mahjong-hilo/start-game            BET TOKEN
// GET  	/donut/api/v1/game/mahjong-hilo/withdraw
// GET  	/donut/api/v1/game/mahjong-hilo/transfer
// POST  /donut/api/v1/game/mahjong-hilo/add/bet
// POST  /donut/api/v1/game/mahjong-hilo/play-hilo
// GET  	/donut/api/v1/game/mahjong-hilo/init                  START
// POST  /donut/api/v1/game/mahjong-hilo/declare/kong
// POST  /donut/api/v1/game/mahjong-hilo/discard-tile
// GET  	/donut/api/v1/game/mahjong-hilo/declare/win-hand
// GET  	/donut/api/v1/game/mahjong-hilo/reset
// GET  	/donut/api/v1/game/mahjong-hilo/quit
// GET  	/donut/api/v1/game/mahjong-hilo/consecutive-hilo

// GET  	/donut/api/v1/game/mahjong-hilo/max-payout
// GET  	/donut/api/v1/game/mahjong-hilo/total-hilo-played
// GET  	/donut/api/v1/game/mahjong-hilo/ranking/monthly
// GET  	/donut/api/v1/game/mahjong-hilo/hilo-winrate

// POST Forms:
// val mjHiloDeclareKongForm = Form(single("sets" -> list(number)))
// val mjHiloDiscardTileForm = Form(single("tile" -> number))
// val mjHiloPlayHiloForm = Form(single("option" -> number))
// val mjHiloAddBetForm = Form(single("quantity" -> number))
