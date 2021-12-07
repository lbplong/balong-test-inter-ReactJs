import * as Type from "../Constants/PostType";

var initialListItems = [];
const PagingReducer = (state = initialListItems, actions) => {
  switch (actions.type) {
    case Type.GET_DEFAULT_LIST_ITEMS:
      state = actions.listItems;
      return state;
    case Type.GET_LOADING_LIST_ITEMS:
      state = actions.listItems;
      return state;
    case Type.UPDATE_POST_TOTAL_LIKE:
      state = actions.listItems;
      return state;
    default:
      return state;
  }
};
export default PagingReducer;
