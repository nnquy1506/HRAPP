import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  leaveDeclareList: [],
  totalPage: 0,
};

const LeaveDeclareReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_LEAVE_DECLARE:
      return {
        ...state,
        leaveDeclareList: [...state.leaveDeclareList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_LEAVE_DECLARE_REFRESH:
      return {
        ...state,
        leaveDeclareList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default LeaveDeclareReducer;
