import { ACTION_TYPE } from "../../constants/ActionType";

export const getJobTitleList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_JOB_TITLE,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getOptionJobTitle = (response) => {
  return {
    type: ACTION_TYPE.GET_OPTION_JOB_TITLE,
    payload: {
      data: response,
    },
  };
};

export const setListJobTitleEmpty = () => {
  return {
    type: ACTION_TYPE.SET_LIST_JOB_TITLE_EMPTY,
  };
};

export const getJobTitleListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_JOB_TITLE_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
