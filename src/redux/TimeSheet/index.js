import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  timesheetList: [],
  totalPage: 0,
};

const TimesheetReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_TIMESHEET:
      return {
        ...state,
        timesheetList: [...state.timesheetList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_TIMESHEET_REFRESH:
      return {
        ...state,
        timesheetList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default TimesheetReducer;
