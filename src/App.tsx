import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Response from "./pages/Response";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/responses">
          <Response />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
