import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  allowanceList: [],
  totalPage: 0,
};

const AllowanceReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_ALLOWANCES:
      return {
        ...state,
        allowanceList: [...state.allowanceList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.SET_LIST_ALLOWANCES_EMPTY:
      return {
        ...state,
        allowanceList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_LIST_ALLOWANCES_REFRESH:
      return {
        ...state,
        allowanceList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default AllowanceReducer;
