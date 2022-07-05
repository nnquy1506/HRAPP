import { ACTION_TYPE } from "../../constants/ActionType";

export const getTimesheetList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_TIMESHEET,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const getTimesheetListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_TIMESHEET_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
