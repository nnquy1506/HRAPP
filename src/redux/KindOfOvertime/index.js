import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  kindOfOverTimeList: [],
  totalPage: 0,
};

const KindOfOverTimeReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_KIND_OF_OVERTIME:
      return {
        ...state,
        kindOfOverTimeList: [
          ...state.kindOfOverTimeList,
          ...action.payload.data,
        ],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.SET_LIST_KIND_OF_OVERTIME_EMPTY:
      return {
        ...state,
        kindOfOverTimeList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_LIST_KIND_OF_OVERTIME_REFRESH:
      return {
        ...state,
        kindOfOverTimeList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default KindOfOverTimeReducer;
