import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  detailContractList: [],
  totalPage: 0,
};

const DetailContractReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_DETAIL_CONTRACT:
      return {
        ...state,
        detailContractList: [
          ...state.detailContractList,
          ...action.payload.data,
        ],
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.GET_LIST_DETAIL_CONTRACT_REFRESH:
      return {
        ...state,
        detailContractList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default DetailContractReducer;
