import { ACTION_TYPE } from "../../constants/ActionType";

export const getLevelList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_LEVEL,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getOptionLevel = (response) => {
  return {
    type: ACTION_TYPE.GET_OPTION_LEVEL,
    payload: {
      data: response,
    },
  };
};
export const setListLevelItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_LEVEL_EMPTY,
  };
};

export const getLevelListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_LEVEL_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
