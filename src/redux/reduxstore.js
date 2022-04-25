import { SAVENICKNAME, SAVEUSERID, SAVEUSERIDFAIL, REQ } from "./actionTypes";
import produce from "immer";

const initialState = {
  loading: false,
  error: null,
  nickname: [],
  payload: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ:
      return { ...state, loading: true };

    case SAVENICKNAME:
      return {
        ...state,
        nickname: action.payload,
      };

    case SAVEUSERID:
      return {
        ...state,
        loading: false,
        payload: action.data,
      };

    case SAVEUSERIDFAIL:
      return {
        ...state,
        loading: false,
      error: action.message};

    default:
      return state;
  }
};

export default reducer;
