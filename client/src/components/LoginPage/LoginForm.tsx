import React from "react";
import styles from "./LoginForm.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../UI";
import { useNavigate } from "react-router-dom";

export interface ILoginFields {
  login: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFields>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginFields> = (data) => {
    console.log(data);
    navigate("/tickets");
  };

  return (
    <form className={styles["loginForm-wrapper"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["loginForm-inputs"]}>
        <Input register={register} name="login" label="Логин" errors={errors} validationRules={{ required: "Поле обязательное" }} type="text" />
        <Input register={register} name="password" label="Пароль" errors={errors} validationRules={{ required: "Поле обязательное" }} type="password" />
      </div>
      <div className={styles["loginForm-submit"]}>
        <Button style={{ width: "240px" }}>Вход</Button>
      </div>
    </form>
  );
};

export default LoginForm;
