import React from "react";
import "./App.scss";
import { HashRouter as Router } from "react-router-dom";
import { Layout } from "./Layout/index";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Layout />
       </HashRouter>
    </div>
  );
}

export default App;
