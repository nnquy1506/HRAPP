import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  levelList: [],
  levelOption: [{ label: "IT", value: 1 }],
  totalPage: 0,
};

const LevelReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_LEVEL:
      return {
        ...state,
        levelList: [...state.levelList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_OPTION_LEVEL:
      return {
        ...state,
        levelOption: action.payload.data,
      };
    case ACTION_TYPE.SET_LIST_LEVEL_EMPTY:
      return {
        ...state,
        levelList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_LIST_LEVEL_REFRESH:
      return {
        ...state,
        levelList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default LevelReducer;
