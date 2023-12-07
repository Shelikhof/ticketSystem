import React from "react";
import { Button } from "../../UI";
import styles from "./MobileHeaderMenu.module.css";
import Menu from "./Menu";

interface IProp {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  role: string;
  logOut: () => void;
}

const MobileHeaderMenu: React.FC<IProp> = ({ isActive, setIsActive, role, logOut }) => {
  let classes = [""];
  if (isActive) {
    classes = [styles["mobile-header"], styles["mobile-header--active"]];
  } else {
    classes = [styles["mobile-header"]];
  }
  return (
    <nav className={classes.join(" ")}>
      <div className={styles["menu-wrapper"]}>
        <nav>
          <Menu role={role} />
          <Button onClick={logOut} btnStyle="red">
            Выйти
          </Button>
        </nav>
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
