import React from "react";
import { Route, Routes } from "react-router-dom";
import GroupsPage from "../pages/groups/GroupsPage";
import AddGroupPage from "../pages/groups/AddGroupPage";
import SingleGroupPage from "../pages/groups/SingleGroupPage";

const GroupRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupsPage />} />
      <Route path="/:id" element={<SingleGroupPage />} />
      <Route path="/add" element={<AddGroupPage />} />
    </Routes>
  );
};

export default GroupRouter;
