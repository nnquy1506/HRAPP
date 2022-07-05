import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  departmentList: [],
  departmentOption: [{ label: "IT", value: 1 }],
  totalPage: 0,
};

const DepartmentReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_DEPARTMENT:
      return {
        ...state,
        departmentList: [...state.departmentList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.SET_LIST_DEPARTMENT_EMPTY:
      return {
        ...state,
        departmentList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_OPTION_DEPARTMENT:
      return {
        ...state,
        departmentOption: action.payload.data,
      };
    case ACTION_TYPE.GET_LIST_DEPARTMENT_REFRESH:
      return {
        ...state,
        departmentList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default DepartmentReducer;
