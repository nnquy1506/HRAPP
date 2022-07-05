import { ACTION_TYPE } from "../../constants/ActionType";

export const getContractList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_CONTRACT,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const getOptionContract = (response) => {
  return {
    type: ACTION_TYPE.GET_OPTION_CONTRACT,
    payload: {
      data: response,
    },
  };
};

export const setListContractItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_CONTRACT_EMPTY,
  };
};

export const getContractListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_CONTRACT_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const getContractDetailListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_CONTRACT_DETAIL_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const getContractDetailList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_CONTRACT_DETAIL,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
