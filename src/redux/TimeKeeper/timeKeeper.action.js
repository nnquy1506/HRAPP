import { ACTION_TYPE } from "../../constants/ActionType";

export const getTimeKeeperLists = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_TIMEKEEPER,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const setListTimeKeeperItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_TIMEKEEPER_EMPTY,
  };
};

export const getTimeKeeperListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_TIMEKEEPER_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
