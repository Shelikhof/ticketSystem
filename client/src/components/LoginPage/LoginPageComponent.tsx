import React from "react";
import styles from "./LoginPageComponent.module.css";
import logo from "../../assets/images/logo.png";
import LoginForm from "./LoginForm";

const LoginPageComponent: React.FC = () => {
  return (
    <div className={styles["login-page"]}>
      <div className={styles["form-wrapper"]}>
        <img className={styles["logo"]} src={logo} />
        <h2>Авторизация</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPageComponent;
