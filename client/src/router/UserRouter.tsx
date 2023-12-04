import React from "react";
import { Route, Routes } from "react-router-dom";
import UsersPage from "../pages/users/UsersPage";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
    </Routes>
  );
};

export default UserRouter;
