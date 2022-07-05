import { ACTION_TYPE } from "../../constants/ActionType";

export const getDetailContractList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_DETAIL_CONTRACT,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const getDetailContractListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_DETAIL_CONTRACT_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
