import React, { useState } from "react";
import Container from "../Container/Container";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import { Button } from "../../UI";
import MobileHeaderMenu from "./MobileHeaderMenu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { clearUserInfo } from "../../store/slices/authSlice";

const Header: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(clearUserInfo());
    navigate("/login");
  };

  return (
    <header className={styles["header"]}>
      <Container>
        <div className={styles["header-content"]}>
          <div className={styles["left-side"]}>
            <img src={logo} />
            <p>
              Валерий Рыбаков <span>Admin</span>
            </p>
          </div>
          <nav>
            <a href="#">Заявки</a>
            <a href="#">Преподаватели</a>
            <a href="#">Студенты</a>
            <a href="#">Группы</a>
            <Button>Создать заявку</Button>
            <Button onClick={logOut} style={{ background: "var(--pink-color)", color: "var(--red-color)" }}>
              Выйти
            </Button>
          </nav>
          <button onClick={() => setIsActive(true)} className={styles["open-menu-btn"]}>
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40" fill="#003f81">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
      </Container>
      <MobileHeaderMenu isActive={isActive} setIsActive={setIsActive} />
    </header>
  );
};

export default Header;
