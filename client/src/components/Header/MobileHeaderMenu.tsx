import React from "react";
import { Button } from "../../UI";
import styles from "./MobileHeaderMenu.module.css";

interface IProp {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

const MobileHeaderMenu: React.FC<IProp> = ({ isActive, setIsActive }) => {
  let classes = [""];
  if (isActive) {
    classes = [styles["mobile-header"], styles["mobile-header--active"]];
  } else {
    classes = [styles["mobile-header"]];
  }
  return (
    <nav className={classes.join(" ")}>
      <div className={styles["menu-wrapper"]}>
        <a href="#">Заявки</a>
        <a href="#">Преподаватели</a>
        <a href="#">Студенты</a>
        <a href="#">Группы</a>
        <div className={styles["create-ticket-btn"]}>
          <Button>Создать заявку</Button>
        </div>
        <button className={styles["close-btn"]} onClick={() => setIsActive(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#fff">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default MobileHeaderMenu;
