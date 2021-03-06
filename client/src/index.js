import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//REDUX---------------------------------------------
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
