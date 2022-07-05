import { ACTION_TYPE } from "../../constants/ActionType";

export const getAllowanceList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_ALLOWANCES,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getAllowanceListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_ALLOWANCES_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const setListItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_ALLOWANCES_EMPTY,
  };
};
