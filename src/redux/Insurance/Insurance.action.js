import { ACTION_TYPE } from "../../constants/ActionType";

export const getInsuranceList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_INSURANCE,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const setListInsuranceEmpty = () => {
  return {
    type: ACTION_TYPE.SET_LIST_INSURANCE_EMPTY,
  };
};

export const getInsuranceListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_INSURANCE_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
