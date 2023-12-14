import { Route, Routes } from "react-router-dom";
import UsersPage from "../pages/users/UsersPage";
import SingleUserPage from "../pages/users/SingleUserPage";
import AddUserPage from "../pages/users/AddUserPage";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/:id" element={<SingleUserPage />} />
      <Route path="add" element={<AddUserPage />} />
    </Routes>
  );
};

export default UserRouter;
