import React from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { DevPage, LoginPage, TicketsListPage } from "../pages";
import CertificatePage from "../pages/certificates/CertificatePage";
import SingleCertificatePage from "../pages/certificates/SingleCertificatePage";
import AddCertificatePage from "../pages/certificates/AddCertificatePage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dev" element={<DevPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ticket" element={<TicketsListPage />} />
      <Route path="/certificate" element={<CertificatePage />} />
      <Route path="/certificate/:id" element={<SingleCertificatePage />} />
      <Route path="/certificate/add" element={<AddCertificatePage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={"/404"} />} />
    </Routes>
  );
};

export default AppRouter;
