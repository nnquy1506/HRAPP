import { ACTION_TYPE } from "../../constants/ActionType";

export const getDepartmentLists = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_DEPARTMENT,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getOptionDepartment = (response) => {
  return {
    type: ACTION_TYPE.GET_OPTION_DEPARTMENT,
    payload: {
      data: response,
    },
  };
};

export const setListDepartmentEmpty = () => {
  return {
    type: ACTION_TYPE.SET_LIST_DEPARTMENT_EMPTY,
  };
};

export const getDepartmentListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_DEPARTMENT_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
