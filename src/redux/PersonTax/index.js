import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  personTaxList: [],
  totalPage: 0,
};

const PersonTaxReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_PERSON_TAX:
      return {
        ...state,
        personTaxList: state.personTaxList.concat(action.payload.data),
        totalPage: action.payload.totalPage,
      };
    case ACTION_TYPE.SET_LIST_PERSON_TAX_EMPTY:
      return {
        ...state,
        personTaxList: [],
        totalPage: 0,
      };
    case ACTION_TYPE.GET_LIST_PERSON_TAX_REFRESH:
      return {
        ...state,
        personTaxList: action.payload.data,
        totalPage: action.payload.totalPage,
      };
    default:
      return state;
  }
};

export default PersonTaxReducer;
