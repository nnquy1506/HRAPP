import { ACTION_TYPE } from "../../constants/ActionType";

export const getRoleList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_ROLE,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getRoleListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_ROLE_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
