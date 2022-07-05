import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  insuranceList: [],
  insuranceFilter: [],
  totalPage: 0,
};

const InsuranceReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_INSURANCE:
      return {
        ...state,
        insuranceList: [...state.insuranceList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.SET_LIST_INSURANCE_EMPTY:
      return {
        ...state,
        insuranceList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_LIST_INSURANCE_REFRESH:
      return {
        ...state,
        insuranceList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default InsuranceReducer;
