import { ACTION_TYPE } from "../../constants/ActionType";

export const getTimekeepingList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_TIMEKEEPING,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const getTimekeepingListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_TIMEKEEPING_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
