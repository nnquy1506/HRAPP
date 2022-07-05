import {HOME_PAGE} from '../../constants/ActionType';

const initState = {
  initData: 'NCH',
};

export default (state = initState, action) => {
  switch (action.type) {
    case HOME_PAGE.INIT_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
