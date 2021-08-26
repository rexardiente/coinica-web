import { GHOST_QUEST_ACTIONS  } from './ghost_quest_actions';

let GQ_GAME_VOLUME = localStorage.getItem('GQ_GAME_VOLUME');
if (GQ_GAME_VOLUME === null) {
  localStorage.setItem('GQ_GAME_VOLUME', 1)
}

const INITIAL_STATE = {
  game_data: null,
  username: null,
  volume: parseInt(GQ_GAME_VOLUME),
  game_history: [],
  in_battle_list: [],
  battle_end_list: [],
  // RANKING
  "earnings-daily": [],
  "earnings-weekly": [],
  "earnings-lifetime": [],
  "win-daily":  [],
  "win-weekly":  [],
  "win-lifetime": [],
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GHOST_QUEST_ACTIONS.SET_DATA:
      return {
        ...state,
        game_data: payload.game_data
      };
    case GHOST_QUEST_ACTIONS.SET_VOLUME:
      const volume = parseInt(payload.volume)
      localStorage.setItem("GQ_GAME_VOLUME", volume)
      return {
        ...state,
        volume
      }
    case GHOST_QUEST_ACTIONS.SET_GAME_HISTORY:
      return {
        ...state,
        game_history: payload.game_history
      }
    case GHOST_QUEST_ACTIONS.UPDATE_GAME_HISTORY:
      const newData = payload.newData
      let updated_history = [...state.game_history]

      // check if data already added
      if (updated_history.find(history => history?.id === newData?.id)) return { ...state }

      updated_history.unshift(newData)
      updated_history.pop()
      return {
        ...state,
        game_history: updated_history
      }
    case GHOST_QUEST_ACTIONS.UPDATE_IN_BATTLE_LIST:
      return {
        ...state,
        in_battle_list: payload.ghost_list
      }
    case GHOST_QUEST_ACTIONS.UPDATE_BATTLE_END_LIST:
      return {
        ...state,
        battle_end_list: payload.ghost_list
      }
    case GHOST_QUEST_ACTIONS.UPDATE_RANKING_LIST:
      const { data, category } = payload
      if (data && Array.isArray(data)) {
        return {
          ...state,
          [category]: data
        }
      }
      return state;
    default:
      return state;
  }
};

export default reducer;
