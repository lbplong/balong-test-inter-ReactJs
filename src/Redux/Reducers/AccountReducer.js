import * as Type from "./../Constants/AccountTypes";

var initialAccount = {};
const AccountReducer = (state = initialAccount, actions) => {
  switch (actions.type) {
    case Type.FETCH_ACCOUNT_FROM_TOKEN:
      state = actions.account;
      return state;
    default:
      return state;
  }
};
export default AccountReducer;
