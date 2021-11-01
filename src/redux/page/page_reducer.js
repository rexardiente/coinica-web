import { PAGE_ACTIONS } from "./page_action";

const INITIAL_STATE = {
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAGE_ACTIONS.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
