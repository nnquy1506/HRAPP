import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  contractList: [],
  contractDetailList: [],
  totalPage: 0,
  totalPageDetail: 0,
};

const ContractReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_CONTRACT:
      return {
        ...state,
        contractList: [...state.contractList, ...action.payload.data],
        totalPage: action.payload.totalPage,
      };

    case ACTION_TYPE.GET_LIST_CONTRACT_REFRESH:
      return {
        ...state,
        contractList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_CONTRACT_DETAIL:
      return {
        ...state,
        contractDetailList: [
          ...state.contractDetailList,
          ...action.payload.data,
        ],
        totalPageDetail: action.payload.totalPageDetail,
      };

    case ACTION_TYPE.GET_LIST_CONTRACT_DETAIL_REFRESH:
      return {
        ...state,
        contractDetailList: action.payload.data,
        totalPageDetail: action.payload.totalPageDetail,
      };
    default:
      return state;
  }
};

export default ContractReducer;
