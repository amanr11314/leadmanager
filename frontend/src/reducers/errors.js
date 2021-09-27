import { GET_ERRORS, RESET_ERRORS } from "../actions/types";
const initialError = {
  msg: {},
  status: null,
};
export const errorreducer = (state, action) => {
  switch (action.type) {
    case GET_ERRORS:
      console.log("GET_ERRORS called!");
      return action.payload;
    case RESET_ERRORS:
      return {
        msg: {},
        status: null,
      };
    default:
      return state;
  }
};
