import React from "react";
import { Route, Routes } from "react-router-dom";
import { DevPage, LoginPage, TicketsListPage } from "../pages";
import NotFoundPage from "../pages/NotFoundPage";
import CertificateRouter from "./CertificateRouter";
import StudentRouter from "./StudentRouter";
import UserRouter from "./UserRouter";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dev" element={<DevPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ticket" element={<TicketsListPage />} />
      <Route path="/certificates/*" element={<CertificateRouter />} />
      <Route path="/students/*" element={<StudentRouter />} />
      <Route path="/users/*" element={<UserRouter />} />
      <Route path="/404" element={<NotFoundPage />} />
      {/* <Route path="*" element={<Navigate to={"/404"} />} /> */}
    </Routes>
  );
};

export default AppRouter;
