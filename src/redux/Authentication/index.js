import { ACTION_TYPE } from "../../constants/ActionType";

const initState = {
  currentUser: {},
  accesstoken: "",
};

const AuthenticationReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.data,
      };
    case ACTION_TYPE.ACCESSTOKEN:
      return {
        ...state,
        accesstoken: action.payload.data,
      };
    case ACTION_TYPE.RESET_ACCESSTOKEN:
      return {
        ...state,
        accesstoken: "",
      };
    default:
      return state;
  }
};

export default AuthenticationReducer;
