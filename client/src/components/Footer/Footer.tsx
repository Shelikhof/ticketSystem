import React from "react";
import styles from "./Footer.module.css";
import Container from "../Container/Container";
import logo from "../../assets/images/logoDev.svg";
import clown from "../../assets/images/clown.png";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <Container>
        <div className={styles["footer-content"]}>
          <div className={styles["left-side"]}>
            <img className={styles["logo"]} src={logo} />
            <p>
              Все права защищены <img src={clown} />
            </p>
          </div>
          <div className={styles["right-side"]}>
            <p>Авторы</p>
            <p>Шелихов Александр</p>
            <p>Романов Владислав</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
