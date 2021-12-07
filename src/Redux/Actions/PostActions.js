import PostAPI from "../../API/ModuleAPI/PostAPI";
import * as Type from "../Constants/PostType";

export const getListItemsDefault = (date, page, amount, token) => {
  const params = {
    dateS: date,
    page: page,
    amount: amount,
    token: token,
  };
  return async (dispatch) => {
    const listItems = await PostAPI.getDefaultListItems(params);
    dispatch({
      type: Type.GET_DEFAULT_LIST_ITEMS,
      listItems: listItems.listItems,
    });
  };
};
export const fetchListItem = (date, page, amount, token, listCurrentItem) => {
  const params = {
    dateS: date,
    page: page,
    amount: amount,
    token: token,
  };
  return async (dispatch) => {
    const listItems = await PostAPI.getDefaultListItems(params);
    dispatch({
      type: Type.GET_LOADING_LIST_ITEMS,
      listItems: [...listCurrentItem, ...listItems.listItems],
    });
  };
};
export const updatePostTotalLike = (listItems, postUpdate) => {
  var i = listItems
    .map((e) => {
      return e.id;
    })
    .indexOf(postUpdate.id);
  listItems[i] = postUpdate;
  var newListItems = listItems;
  return (dispatch) => {
    dispatch({
      type: Type.UPDATE_POST_TOTAL_LIKE,
      listItems: [...newListItems],
    });
  };
};
