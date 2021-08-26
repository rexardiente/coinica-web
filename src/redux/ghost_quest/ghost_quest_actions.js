export const GHOST_QUEST_ACTIONS = {
  SET_DATA: 'GHOST_QUEST/SET_DATA',
  SET_VOLUME: 'GHOST_QUEST/SET_VOLUME',
  SET_GAME_HISTORY: 'GHOST_QUEST/SET_GAME_HISTORY',
  UPDATE_GAME_HISTORY: 'GHOST_QUEST/UPDATE_GAME_HISTORY',
  UPDATE_IN_BATTLE_LIST: 'GHOST_QUEST/UPDATE_IN_BATTLE_LIST',
  UPDATE_BATTLE_END_LIST: 'GHOST_QUEST/UPDATE_BATTLE_END_LIST',
  UPDATE_RANKING_LIST: 'GHOST_QUEST/UPDATE_RANKING_LIST',
};

export const setGhostQuestData = (payload) => ({ type: GHOST_QUEST_ACTIONS.SET_DATA, payload });
export const setGhostQuestVolume = (payload) => ({ type: GHOST_QUEST_ACTIONS.SET_VOLUME, payload });
export const setGhostQuestGameHistory = (payload) => ({ type: GHOST_QUEST_ACTIONS.SET_GAME_HISTORY, payload });
export const updateGhostQuestHistory = (payload) => ({ type: GHOST_QUEST_ACTIONS.UPDATE_GAME_HISTORY, payload });
export const updateInBattleList = (payload) => ({ type: GHOST_QUEST_ACTIONS.UPDATE_IN_BATTLE_LIST, payload });
export const updateBattleEndList = (payload) => ({ type: GHOST_QUEST_ACTIONS.UPDATE_BATTLE_END_LIST, payload });
export const updateRankingList = (payload) => ({ type: GHOST_QUEST_ACTIONS.UPDATE_RANKING_LIST, payload });
