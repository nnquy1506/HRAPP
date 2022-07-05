import { ACTION_TYPE } from "../../constants/ActionType";

export const getShiftList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_SHIFT,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getOptionShift = (response) => {
  return {
    type: ACTION_TYPE.GET_OPTION_SHIFT,
    payload: {
      data: response,
    },
  };
};

export const setListShiftItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_SHIFT_EMPTY,
  };
};

export const getShiftListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_SHIFT_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
