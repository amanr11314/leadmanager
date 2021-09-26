import { CREATE_MESSAGE } from "../actions/types";

export const messagereducer = (state, action) => {
  switch (action.type) {
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
};
