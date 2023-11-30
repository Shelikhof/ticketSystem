import React from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { DevPage, LoginPage, TicketsListPage } from "../pages";
import CertificatePage from "../pages/certificates/CertificatePage";
import SingleCertificatePage from "../pages/certificates/SingleCertificatePage";
import AddCertificatePage from "../pages/certificates/AddCertificatePage";
import NotFoundPage from "../pages/NotFoundPage";
import StudentsPage from "../pages/students/StudentsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dev" element={<DevPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ticket" element={<TicketsListPage />} />
      <Route path="/certificates" element={<CertificatePage />} />
      <Route path="/certificates/:id" element={<SingleCertificatePage />} />
      <Route path="/certificates/add" element={<AddCertificatePage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={"/404"} />} />
    </Routes>
  );
};

export default AppRouter;
