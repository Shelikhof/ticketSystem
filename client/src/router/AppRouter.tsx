import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DevPage, LoginPage, TicketsListPage } from "../pages";
import NotFoundPage from "../pages/NotFoundPage";
import CertificateRouter from "./CertificateRouter";
import StudentRouter from "./StudentRouter";
import UserRouter from "./UserRouter";
import GroupRouter from "./GroupRouter";
import TicketRouter from "./TicketRouter";
import { useAppSelector } from "../store/hook";
import roleValidator from "../utils/roleValidator";

const AppRouter = () => {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tickets" />} />
      <Route path="/dev" element={roleValidator(role, ["Админ"]) ? <DevPage /> : <Navigate to={"/404"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/ticket" element={<TicketsListPage />} />
      <Route path="/certificates/*" element={roleValidator(role, ["Админ"]) ? <CertificateRouter /> : <Navigate to={"/404"} />} />
      <Route path="/students/*" element={<StudentRouter />} />
      <Route path="/users/*" element={roleValidator(role, ["Админ"]) ? <UserRouter /> : <Navigate to={"/404"} />} />
      <Route path="/groups/*" element={roleValidator(role, ["Админ"]) ? <GroupRouter /> : <Navigate to={"/404"} />} />
      <Route path="/tickets/*" element={<TicketRouter />} />
      <Route path="/404" element={<NotFoundPage />} />
      {/* <Route path="*" element={<Navigate to={"/404"} />} /> */}
    </Routes>
  );
};

export default AppRouter;
