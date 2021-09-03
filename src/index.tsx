import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import App from "./App";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./index.scss";
import "./assets/js/main";
import AppNewDesign from "./newDesign/AppNewDesign";

let myEnv = dotenv.config();
dotenvExpand(myEnv);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          {/* <App /> */}
          <AppNewDesign />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
