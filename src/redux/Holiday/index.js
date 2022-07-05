import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  holidayList: [],
  holidayFilter: [],
  totalPage: 0,
};

const HolidayReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_HOLIDAY:
      return {
        ...state,
        holidayList: [...state.holidayList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.SET_LIST_HOLIDAY_EMPTY:
      return {
        ...state,
        holidayList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_LIST_HOLIDAY_REFRESH:
      return {
        ...state,
        holidayList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default HolidayReducer;
