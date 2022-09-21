import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Upload from "./pages/Upload";


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/upload">
          <Upload />
        </Route>
      </Switch>
    </>
  );
}

export default App;
