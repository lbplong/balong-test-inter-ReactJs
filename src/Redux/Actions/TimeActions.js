import * as Type from "../Constants/TimeType";

export const getCurrentDate = () => {
  var currentTime =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    (new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate());
  return (dispatch) => {
    dispatch({
      type: Type.NOW_DATE,
      nowDate: currentTime,
    });
  };
};
export const setSelectDate = (date) => {
  return (dispatch) => {
    dispatch({
      type: Type.SELECT_DATE,
      nowDate: date,
    });
  };
};
