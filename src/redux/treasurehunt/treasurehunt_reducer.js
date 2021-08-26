import { TREASUREHUNT_ACTIONS  } from './treasurehunt_actions';

const INITIAL_STATE = {
  game_data: null,
  id: null,
  game_history: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TREASUREHUNT_ACTIONS.SET_DATA:
      return {
        ...state,
        game_data: action.payload.game_data,
        id: action.payload.id
      };
    case TREASUREHUNT_ACTIONS.SET_GAME_HISTORY:
      return {
        ...state,
        game_history: action.payload.game_history
      }
    case TREASUREHUNT_ACTIONS.UPDATE_GAME_HISTORY:
      const newData = action.payload.newData
      let updated_history = [...state.game_history]

      // check if data already added
      if (updated_history.find(history => history?.id === newData?.id)) return { ...state }

      updated_history.unshift(newData)
      updated_history.pop()
      return {
        ...state,
        game_history: updated_history
      }
    default:
      return state;
  }
};

export default reducer;
