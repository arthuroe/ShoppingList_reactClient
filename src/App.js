import React from "react";
import Main from "./components/main";
import Navbar from "./components/navbar";

const App = () => (
  <div>
    <Navbar />
    <div className="container">
      <Main />
    </div>
  </div>
);

export default App;
