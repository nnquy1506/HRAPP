import { ACTION_TYPE } from "../../constants/ActionType";

export const getLeaveDeclareList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_LEAVE_DECLARE,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getLeaveDeclareListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_LEAVE_DECLARE_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
