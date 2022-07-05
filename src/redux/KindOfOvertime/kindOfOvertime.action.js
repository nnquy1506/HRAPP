import { ACTION_TYPE } from "../../constants/ActionType";

export const getKindOfOverTimeLists = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_KIND_OF_OVERTIME,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const setListItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_KIND_OF_OVERTIME_EMPTY,
  };
};

export const getKindOfOverTimeListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_KIND_OF_OVERTIME_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
