import { ACTION_TYPE } from "../../constants/ActionType";

export const getHolidayList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_HOLIDAY,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};

export const setListHolidayItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_HOLIDAY_EMPTY,
  };
};

export const getHolidayListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_HOLIDAY_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
