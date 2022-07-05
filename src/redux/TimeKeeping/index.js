import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  timekeepingList: [],
  totalPage: 0,
};

const TimekeepingReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_TIMEKEEPING:
      return {
        ...state,
        timekeepingList: state.timekeepingList.concat(action.payload.data),
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_TIMEKEEPING_REFRESH:
      return {
        ...state,
        timekeepingList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default TimekeepingReducer;
