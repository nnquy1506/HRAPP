import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  salaryCalList: [],
  detailSalaryCalList: [],
  totalPageDetail: 0,
  totalPage: 0,
};

const SalaryCalReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_SALARY_CAL:
      return {
        ...state,
        salaryCalList: state.salaryCalList.concat(action.payload.data),
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_SALARY_CAL_REFRESH:
      return {
        ...state,
        salaryCalList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_DETAIL_SALARY_CAL:
      return {
        ...state,
        detailSalaryCalList: state.detailSalaryCalList.concat(
          action.payload.data
        ),
        totalPageDetail: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_DETAIL_SALARY_CAL:
      return {
        ...state,
        detailSalaryCalList: action.payload.data,
        totalPageDetail: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default SalaryCalReducer;
