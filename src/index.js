import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/login.js";
import Register from "./components/register.js";
import Logout from "./components/logout.js";
import ResetPassword from "./components/reset-password.js";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <App />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
