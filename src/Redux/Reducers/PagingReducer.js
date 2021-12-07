import * as Type from "./../Constants/PagingType";

var initialPaging = 0;
const PagingReducer = (state = initialPaging, actions) => {
  switch (actions.type) {
    case Type.SET_PAGING:
      state = actions.paging;
      return state;
    default:
      return state;
  }
};
export default PagingReducer;
