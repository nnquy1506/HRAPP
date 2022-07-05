import { ACTION_TYPE } from "../../constants/ActionType";

export const getEmployeeList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_EMPLOYEE,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getEmployeeListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_EMPLOYEE_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getEmployeeInActiveList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_EMPLOYEE_INACTIVE,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getEmployeeInActiveListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_EMPLOYEE_INACTIVE_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const setListEmployeeItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_EMPLOYEE_EMPTY,
  };
};
