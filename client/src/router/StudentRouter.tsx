import { Navigate, Route, Routes } from "react-router-dom";
import StudentsPage from "../pages/students/StudentsPage";
import AddStudentPage from "../pages/students/AddStudentPage";
import SingleStudentPage from "../pages/students/SingleStudentPage";
import roleValidator from "../utils/roleValidator";
import { useAppSelector } from "../store/hook";

const StudentRouter = () => {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={roleValidator(role, ["Админ"]) ? <StudentsPage /> : <Navigate to={"/404"} />} />
      <Route path="/:id" element={<SingleStudentPage />} />
      <Route path="/add" element={roleValidator(role, ["Админ"]) ? <AddStudentPage /> : <Navigate to={"/404"} />} />
    </Routes>
  );
};

export default StudentRouter;
