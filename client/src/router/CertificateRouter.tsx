import React from "react";
import { Route, Routes } from "react-router-dom";
import AddCertificatePage from "../pages/certificates/AddCertificatePage";
import SingleCertificatePage from "../pages/certificates/SingleCertificatePage";
import CertificatePage from "../pages/certificates/CertificatePage";

const CertificateRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CertificatePage />} />
      <Route path="/:id" element={<SingleCertificatePage />} />
      <Route path="/add" element={<AddCertificatePage />} />
    </Routes>
  );
};

export default CertificateRouter;
