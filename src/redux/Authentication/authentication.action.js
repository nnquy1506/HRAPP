import { ACTION_TYPE } from "../../constants/ActionType";

export const getCurrentUser = (data) => {
  return {
    type: ACTION_TYPE.CURRENT_USER,
    payload: {
      data: data,
    },
  };
};
export const setAccesstoken = (data) => {
  return {
    type: ACTION_TYPE.ACCESSTOKEN,
    payload: {
      data: data,
    },
  };
};
export const SignOut = (data) => {
  return {
    type: ACTION_TYPE.RESET_ACCESSTOKEN,
  };
};
