import * as Type from "./../Constants/TimeType";

var initialDate = "";
const TimeReducer = (state = initialDate, actions) => {
  switch (actions.type) {
    case Type.NOW_DATE:
      state = actions.nowDate;
      return state;
    case Type.SELECT_DATE:
      state = actions.nowDate;
      return state;
    default:
      return state;
  }
};
export default TimeReducer;
