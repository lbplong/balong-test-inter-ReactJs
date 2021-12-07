import AccountAPI from "../../API/ModuleAPI/AccountAPI";
import * as Type from "./../Constants/AccountTypes";

export const setAccountFromToken = (token) => {
  const params = { token: token };
  return async (dispatch) => {
    var account = {};
    try {
      account = await AccountAPI.getAccountByToken(params);
    } catch (error) {}
    dispatch({
      type: Type.FETCH_ACCOUNT_FROM_TOKEN,
      account: account,
    });
  };
};
