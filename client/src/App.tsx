import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import "./css/App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <div id="content"> */}
      <AppRouter />
      {/* </div> */}
    </BrowserRouter>
  );
};

export default App;
