import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import "./css/App.css";
import { useAppDispatch, useAppSelector } from "./store/hook";
import AuthService from "./http/AuthService";
import { setUserInfo } from "./store/slices/authSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.auth);

  const fetchData = async () => {
    if (localStorage.getItem("token")) {
      try {
        const userData = await AuthService.validateToken();
        dispatch(setUserInfo({ name: userData.data.user.name, role: userData.data.user.role, id: userData.data.user.id }));
        localStorage.setItem("token", userData.data.token);
      } catch (error) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading && localStorage.getItem("token")) {
    return <p>Загрузка...</p>;
  }
  return <AppRouter />;
};

export default App;
