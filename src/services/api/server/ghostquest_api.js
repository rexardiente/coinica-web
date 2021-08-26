import axios from "axios";
import { store } from 'redux/store';
import { setGhostQuestData } from 'redux/ghost_quest/ghost_quest_actions';
import { getHeaderParams } from "services/auth";
import { ServerAPI as api } from '../../../Config';

const BASE_URL = `${api.protocol}://${api.host}`;

export const GetGameData = ({ id }) => {
  const headers = getHeaderParams();
  const params = { id };
  return axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/game/data`, { params, headers });
}

export const GQ_INITIALIZE_DATA = ({ id, username }) => {
  const headers = getHeaderParams();
  const params = { id, username };
  return axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/init`, { params, headers });
}

export const GQ_SUMMON_GHOST = ({ id, currency, quantity, limit }) => {
  const headers = getHeaderParams();
  const data = { currency, quantity, limit };
  return axios.post(BASE_URL + `/donut/api/v1/game/ghost-quest/generate/character`, data, { headers });
}

export const GQ_ADD_LIFE = ({ key }) => {
  const headers = getHeaderParams();
  const data = { key };
  return axios.post(BASE_URL + `/donut/api/v1/game/ghost-quest/add-life`, data, { headers });
}

export const GQ_WITHDRAW = ({ key }) => {
  const headers = getHeaderParams();
  const data = { key };
  return axios.post(BASE_URL + `/donut/api/v1/game/ghost-quest/withdraw`, data, { headers });
}

export const GetCharacterByUserAndId = (user, id) => {
  const headers = getHeaderParams();
  return axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/character/${user}/${id}`, { headers })
}

export const GetCharacterById = (id) => {
  const headers = getHeaderParams();
  return axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/character/${id}`, { headers })
}

export const GetAllCharacters = async() => {
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + '/donut/api/v1/game/ghost-quest/characters', { headers })
}

export const GetCharactersByUser = async() => {
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/characters/alive`, { headers })
}

export const GetAllCharactersByUser = async(user) => {
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/characters/${user}/all`, { headers })
}

export const CharHistoryByUser = async() => {
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/history/characters`, { headers })
}

export const CharHistoryByUserWithId = async(user, id) => {
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/history/character/${user}/${id}`, { headers })
}

export const GetAllGameHistory = async() => {
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/history/games`, { headers })
}

export const GetAllGameHistoryByUser = async(user) => {
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/history/games/${user}`, { headers })
}

export const GetGameHistoryById = async(id) => {
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/history/game/id/${id}`, { headers })
}

export const GetGameHistoryByUserWithId = async(user, id) => {
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/history/game/${user}/${id}`, { headers })
}

export const GetTopEarningsRank = async(range) => {
  /**
   * @param { range: string }
   * available: 'lifetime', 'daily', 'weekly'
   */
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/characters/rank/earn/${range}`, { headers })
}

export const GetTopWinStreakRank = async(range) => {
  /**
   * @param { range: string }
   * available: 'daily', 'weekly'
   */
  const headers = getHeaderParams();
  return await axios.get(BASE_URL + `/donut/api/v1/game/ghost-quest/characters/rank/win-streak/${range}`, { headers })
}

export const updateGhostQuestData = async ({ id }) => {
  try {
    const { data } = await GetGameData({ id })
    console.log('updateGhostQuestData!!!', { id, data })
    if (data && data.characters) {
      store.dispatch(setGhostQuestData({
        game_data: {
          characters: data.characters
        }
      }))
    } else {
      store.dispatch(setGhostQuestData({ game_data: null }))
    }
  } catch (e) {
    // do nothing
  }
}
