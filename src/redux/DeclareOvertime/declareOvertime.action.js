import { ACTION_TYPE } from "../../constants/ActionType";

export const getDeclareOverTimeList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_DECLARE_OVERTIME,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const setListItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_DECLARE_OVERTIME_EMPTY,
  };
};

export const getDeclareOverTimeListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_DECLARE_OVERTIME_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
