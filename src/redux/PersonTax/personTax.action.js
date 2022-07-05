import { ACTION_TYPE } from "../../constants/ActionType";

export const getPersonTaxList = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_PERSON_TAX,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
export const setListItem = () => {
  return {
    type: ACTION_TYPE.SET_LIST_PERSON_TAX_EMPTY,
  };
};

export const getPersonTaxListRefresh = (response) => {
  return {
    type: ACTION_TYPE.GET_LIST_PERSON_TAX_REFRESH,
    payload: {
      data: response.items,
      totalPage: response.totalPage,
    },
  };
};
