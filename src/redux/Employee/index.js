import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  employeeList: [],
  employeeInactiveList: [],
  employeeFilter: [],
  totalPage: 0,
};

const EmployeeReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_EMPLOYEE:
      return {
        ...state,
        employeeList: state.employeeList.concat(action.payload.data),
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_EMPLOYEE_REFRESH:
      return {
        ...state,
        employeeList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_EMPLOYEE_INACTIVE:
      return {
        ...state,
        employeeInactiveList: state.employeeInactiveList.concat(
          action.payload.data
        ),
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_EMPLOYEE_INACTIVE_REFRESH:
      return {
        ...state,
        employeeInactiveList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.SET_LIST_EMPLOYEE_EMPTY:
      return {
        ...state,
        employeeList: [],
        totalPage: 0,
      };
    default:
      return state;
  }
};

export default EmployeeReducer;
