import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../UI";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <h4>¯\_(ツ)_/¯</h4>
      </div>
      <Link to={"/"}>
        <Button>На главную</Button>
      </Link>
    </div>
  );
};

export default NotFound;
