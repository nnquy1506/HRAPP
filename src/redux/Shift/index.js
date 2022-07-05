import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  shiftList: [],
  shiftOption: [{ label: "IT", value: 1 }],
  totalPage: 0,
};

const ShiftReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_SHIFT:
      return {
        ...state,
        shiftList: [...state.shiftList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_OPTION_SHIFT:
      return {
        ...state,
        shiftOption: action.payload.data,
      };
    case ACTION_TYPE.SET_LIST_SHIFT_EMPTY:
      return {
        ...state,
        shiftList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_LIST_SHIFT_REFRESH:
      return {
        ...state,
        shiftList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default ShiftReducer;
