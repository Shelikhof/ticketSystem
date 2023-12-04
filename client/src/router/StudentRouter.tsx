import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentsPage from "../pages/students/StudentsPage";
import AddStudentPage from "../pages/students/AddStudentPage";
import SingleStudentPage from "../pages/students/SingleStudentPage";

const StudentRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentsPage />} />
      <Route path="/:id" element={<SingleStudentPage />} />
      <Route path="/add" element={<AddStudentPage />} />
    </Routes>
  );
};

export default StudentRouter;
