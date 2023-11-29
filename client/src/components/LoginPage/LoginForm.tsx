import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../UI";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import AuthService from "../../http/AuthService";
import { setUserInfo } from "../../store/slices/authSlice";

//interface for login form fields
export interface ILoginFields {
  login: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  //form error
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFields>();

  const navigate = useNavigate();

  //function on form submit
  const onSubmit: SubmitHandler<ILoginFields> = async (data) => {
    try {
      const userData = await AuthService.login(data.login, data.password);
      dispatch(setUserInfo({ name: userData.data.user.name, role: userData.data.user.role }));
      localStorage.setItem("token", userData.data.token);
      navigate("/tickets");
    } catch (error) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <form className={styles["loginForm-wrapper"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["loginForm-inputs"]}>
        <Input register={register} name="login" label="Логин" errors={errors} validationRules={{ required: "Поле обязательное" }} type="text" />
        <Input register={register} name="password" label="Пароль" errors={errors} validationRules={{ required: "Поле обязательное" }} type="password" />
        {error && <p className={styles["error"]}>{error}</p>}
      </div>
      <div className={styles["loginForm-submit"]}>
        <Button style={{ width: "240px" }} type="submit">
          Вход
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
