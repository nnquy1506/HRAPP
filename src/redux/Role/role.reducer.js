import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  roleList: [],
  totalPage: 0,
};

const RoleReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_ROLE:
      return {
        ...state,
        roleList: [...state.roleList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_ROLE_REFRESH:
      return {
        ...state,
        roleList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default RoleReducer;
