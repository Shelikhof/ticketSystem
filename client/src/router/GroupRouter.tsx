import React from "react";
import { Route, Routes } from "react-router-dom";
import GroupsPage from "../pages/groups/GroupsPage";
import AddGroupPage from "../pages/groups/AddGroupPage";

const GroupRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupsPage />} />
      <Route path="/:id" />
      <Route path="/add" element={<AddGroupPage />} />
    </Routes>
  );
};

export default GroupRouter;
