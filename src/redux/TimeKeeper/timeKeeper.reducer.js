import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  timeKeeperList: [],
  timeKeeperFilter: [],
  totalPage: 0,
};

const TimeKeeperReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_TIMEKEEPER:
      return {
        ...state,
        timeKeeperList: [...state.timeKeeperList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.SET_LIST_TIMEKEEPER_EMPTY:
      return {
        ...state,
        timeKeeperList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_LIST_TIMEKEEPER_REFRESH:
      return {
        ...state,
        timeKeeperList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default TimeKeeperReducer;
