import { createStore } from "redux";
import { SAVEUSERID,  } from "./actionTypes";

const initialState = {
  ID: [],
  payload: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVEUSERID:
      return {...state, payload : action.payload };
        default:   
    };
  }

export const store = createStore(reducer);
