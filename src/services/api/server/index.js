import axios from "axios";
import { ServerAPI as api } from '../../../Config';
import { getHeaderParams } from "services/auth";

const BASE_URL = `${api.protocol}://${api.host}`;

export const challenge = () => {
  const headers = getHeaderParams()
  return axios.get(BASE_URL +'/donut/api/v1/challenge', { headers });
}

export const games = () => {
  const headers = getHeaderParams()
  return axios.get(BASE_URL +'/donut/api/v1/games', { headers });
}

export const genres = () => {
  const headers = getHeaderParams()
  return axios.get(BASE_URL + '/donut/api/v1/genres', { headers });
}

export const ranking = () => {
  const headers = getHeaderParams()
  return axios.get(BASE_URL +'/donut/api/v1/ranking', { headers });
}

export const gameHistory = (params) => {
  const headers = getHeaderParams()
  return axios.get(BASE_URL + '/donut/api/v1/txs', { headers });
}

export const gameHistoryAllGames = () => {
  const headers = getHeaderParams()
  return axios.get(BASE_URL + '/donut/api/v1/game/all/history', { headers });
}

export const gameHistoryWithGameId = (gameId) => {
  const headers = getHeaderParams()
  return axios.get(BASE_URL + `/donut/api/v1/game/all/history/${gameId}`, { headers });
}
export const gameHistoryWithGameIdUserId = (gameId, userId) => {
  const headers = getHeaderParams()
  return axios.get(BASE_URL + `/donut/api/v1/game/all/history/${gameId}/${userId}`, { headers });
}