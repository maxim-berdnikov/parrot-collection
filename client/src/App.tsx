import React from "react";
import "./App.scss";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";
import { Layout } from "./Layout/index";

function App() {
  return (
    <div className="App">
<!--       <Router> -->
      <HashRouter>
        <Layout />
       <HashRouter/>
<!--       </Router> -->
    </div>
  );
}

export default App;
