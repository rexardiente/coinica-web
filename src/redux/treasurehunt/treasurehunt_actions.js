export const TREASUREHUNT_ACTIONS = {
  SET_DATA: 'TREASUREHUNT/SET_DATA',
  SET_GAME_HISTORY: 'TREASUREHUNT/SET_GAME_HISTORY',
  UPDATE_GAME_HISTORY: 'TREASUREHUNT/UPDATE_GAME_HISTORY'
};

export const setTreasurehuntData = (payload) => ({ type: TREASUREHUNT_ACTIONS.SET_DATA, payload });
export const setTreasurehuntGameHistory = (payload) => ({ type: TREASUREHUNT_ACTIONS.SET_GAME_HISTORY, payload });
export const updateTreasurehuntHistory = (payload) => ({ type: TREASUREHUNT_ACTIONS.UPDATE_GAME_HISTORY, payload });
