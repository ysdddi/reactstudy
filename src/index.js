import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./redux/reduxstore";
import createSagaMiddleware from "@redux-saga/core";
import { all, fork } from "redux-saga/effects";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer,composeWithDevTools());
  

//composeWithDevTools(applyMiddleware(sagaMiddleware)
/*export function* rootsaga() {
  yield all([fork(reducer)]);
}*/

//sagaMiddleware.run(rootsaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
