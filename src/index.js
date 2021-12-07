import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//store
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import myReducer from "./Redux/Reducers/index";
import { applyMiddleware, createStore } from "redux";

const store = createStore(myReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
