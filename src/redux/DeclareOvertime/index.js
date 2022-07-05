import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  declareOverTimeList: [],
  totalPage: 0,
};

const DeclareOverTimeReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_DECLARE_OVERTIME:
      return {
        ...state,
        declareOverTimeList: state.declareOverTimeList.concat(
          action.payload.data
        ),
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_DECLARE_OVERTIME_REFRESH:
      console.log(action);
      return {
        ...state,
        declareOverTimeList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default DeclareOverTimeReducer;
