import React from "react";
import { Route, Routes } from "react-router-dom";
import { DevPage, LoginPage, TicketsListPage } from "../pages";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dev" element={<DevPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tickets" element={<TicketsListPage />} />
    </Routes>
  );
};

export default AppRouter;
