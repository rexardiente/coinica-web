import axios from "axios";
import { ServerAPI as api } from 'Config';
import { store } from 'redux/store';
import { getHeaderParams } from "services/auth";
import { setTreasurehuntData } from 'redux/treasurehunt/treasurehunt_actions';

const BASE_URL = `${api.protocol}://${api.host}/donut/api/v1/game/treasurehunt`;
// const BASE_URL = `http://localhost:3006/treasurehunt`

export const TH_ACTION_GET_USER_DATA = ({ id }) => {
  const headers = getHeaderParams()
  const params = { id }
  return axios.get(`${BASE_URL}/game/data`, { headers, params })
}

export const updateTreasurehuntData = async (id) => {
  try {
    const { data } = await TH_ACTION_GET_USER_DATA(id)
    console.log('ID: ', id, ' with table data: ', data)
    if (data) {
      store.dispatch(setTreasurehuntData({
        id: data?.game_id,
        game_data: data
      }))
    } else {
      store.dispatch(setTreasurehuntData({
        id: null,
        game_data: null
      }))
    }
  } catch (e) {
    // do nothing
  }
}

export const updateTreasurehuntDataAutoplay = async (id) => {
  // const table = await TH_ACTION_GET_TABLE(username)
  // let data = {
  //   winCount: null,
  //   loseCount: null,
  //   isLose: null,
  //   prize: null
  // }

  // if (table && table.rows.length > 0 && table.rows[0].username === username) {
  //   const { panel_set, win_count, prize } = table.rows[0].game_data
  //   const loseCount = panel_set.filter(obj => obj.isopen === 1 && obj.iswin === 0).length
  //   if (!loseCount) {
  //     await TH_ACTION_WITHDRAW_GAME({ username })
  //   }
  //   await TH_ACTION_GET_BALANCE(username)

  //   data.winCount = win_count
  //   data.loseCount = loseCount
  //   data.isWin = loseCount === 0
  //   data.prize = prize

  //   store.dispatch(setTreasurehuntData(table.rows[0]))
  // } else {
  //   store.dispatch(setTreasurehuntData({
  //     game_data: null,
  //     game_id: null,
  //     total_win: 0,
  //     username: null
  //   }))
  // }

  // return data

   let objectData = {
    gameId: null,
    winCount: null,
    loseCount: null,
    isLose: null,
    prize: null
  }

  try {
    const { data } = await TH_ACTION_GET_USER_DATA(id)
    if (data) {
      const { game_id, panel_set, win_count, prize } = data
      const loseCount = panel_set.filter(obj => obj.isopen === 1 && obj.iswin === 0).length
      if (!loseCount) {
        await TH_ACTION_WITHDRAW_GAME({ id })
      }

      objectData.gameId = game_id
      objectData.winCount = win_count || 0
      objectData.loseCount = loseCount || 0
      objectData.isWin = loseCount === 0
      objectData.prize = prize

      store.dispatch(setTreasurehuntData({
        id: data?.game_id,
        game_data: data
      }))
    } else {
      store.dispatch(setTreasurehuntData({
        id: null,
        game_data: null
      }))
    }

    return objectData
  } catch (e) {
    return objectData
  }
}

// export const TH_ACTION_GAME_START = ({ id, quantity, currency }) => {
//   const headers = getHeaderParams()
//   const symbol = (currency + "").toUpperCase()
//   const data = { id, quantity, currency: symbol }
//   return axios.post(`${BASE_URL}/start`, data, { headers })
// }

export const TH_ACTION_WITHDRAW_GAME = ({ id }) => {
  const headers = getHeaderParams()
  const params = { id }
  return axios.get(`${BASE_URL}/withdraw`, { headers, params })
}

export const TH_ACTION_INITIALIZE_GAME = ({ id, destination, enemy_count, quantity, currency }) => {
  const headers = getHeaderParams()
  const data = { destination, enemy: enemy_count, quantity, currency: (currency + "").toUpperCase() }
  return axios.post(`${BASE_URL}/init`, data, { headers })
}

export const TH_ACTION_REMOVE_EXISTING_GAME = ({ id, username }) => {
  const headers = getHeaderParams()
  const params = { id, username }
  return axios.get(`${BASE_URL}/quit`, { headers, params })
}

// export const TH_ACTION_SET_GAME_PANEL = ({ id, username }) => {
//   const headers = getHeaderParams()
//   const params = { id, username }
//   return axios.get(`${BASE_URL}/set/gamepanel`, { headers, params })
// }

// export const TH_ACTION_SET_DESTINATION = ({ id, username, destination }) => {
//   const headers = getHeaderParams()
//   const data = { id, username, destination }
//   return axios.post(`${BASE_URL}/set/destination`, data, { headers })
// }

// export const TH_ACTION_SET_ENEMY = ({ id, username, enemy_count }) => {
//   const headers = getHeaderParams()
//   const data = { id, username, enemy: enemy_count }
//   return axios.post(`${BASE_URL}/set/enemy`, data, { headers })
// }

export const TH_ACTION_OPEN_TILE = ({ id, username, index }) => {
  const headers = getHeaderParams()
  const data = { id, username, tile: index }
  return axios.post(`${BASE_URL}/opentile`, data, { headers })
}

export const TH_ACTION_AUTOPLAY_OPT = ({ id, username, panelset }) => {
  const headers = getHeaderParams()
  const data = { id, username, sets: panelset }
  return axios.post(`${BASE_URL}/autoplay`, data, { headers })
}
