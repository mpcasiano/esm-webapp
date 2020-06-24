import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./Users/privateRoute";
import "antd/dist/antd.css";
import App from "./App";
//import Page from "./Survey/view";
//import CreateSurvey from "./Survey/create";
//import ViewResponses from "./Survey/responses/responses";
import DBT from "./Survey/DBT";
import SignIn from "./Users/SignIn";
import SignUp from "./Users/SignUp";
import "antd/dist/antd.less";

ReactDOM.render(
  // <Provider store={store}>
  <Router>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/" component={App} />
      {/* <PrivateRoute path="/survey" component={Page} />
      <PrivateRoute path="/survey/:id" component={ViewResponses} /> */}
      <PrivateRoute path="/DBT" component={DBT} />
    </Switch>
  </Router>,
  // </Provider>,

  document.getElementById("root")
);
