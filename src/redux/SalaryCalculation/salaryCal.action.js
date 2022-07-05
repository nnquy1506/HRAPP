import { ACTION_TYPE } from "../../constants/ActionType";

export const getSalaryCalList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_SALARY_CAL,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const setListItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_PERSON_TAX_EMPTY,
  };
};

export const getSalaryCalListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_SALARY_CAL_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const getDetailSalaryCalList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_DETAIL_SALARY_CAL,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const getDetailSalaryCalListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_DETAIL_SALARY_CAL_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
