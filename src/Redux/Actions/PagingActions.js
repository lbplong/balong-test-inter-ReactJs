import * as Type from "../Constants/PagingType";

export const setPaging = (page) => {
  return (dispatch) => {
    dispatch({
      type: Type.SET_PAGING,
      paging: page,
    });
  };
};
