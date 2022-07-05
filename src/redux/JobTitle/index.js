import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  jobTitleList: [],
  jobTitleOption: [{ label: "IT", value: 1 }],
  totalPage: 0,
};

const JobTitleReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_JOB_TITLE:
      return {
        ...state,
        jobTitleList: [...state.jobTitleList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_OPTION_JOB_TITLE:
      return {
        ...state,
        jobTitleOption: action.payload.data,
      };
    case ACTION_TYPE.SET_LIST_JOB_TITLE_EMPTY:
      return {
        ...state,
        jobTitleList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_LIST_JOB_TITLE_REFRESH:
      return {
        ...state,
        jobTitleList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default JobTitleReducer;
