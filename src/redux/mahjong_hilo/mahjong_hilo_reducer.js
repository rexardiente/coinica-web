import { MAHJONG_HILO_ACTIONS  } from './mahjong_hilo_actions';

const INITIAL_STATE = {
  game_data: null,
  username: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAHJONG_HILO_ACTIONS.SET_DATA:
      return {
        ...state,
        game_data: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
