import React from "react";
import styles from "./Button.module.css";

interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IProp> = ({ children, ...props }) => {
  return (
    <button {...props} className={styles["button"]}>
      {children}
    </button>
  );
};

export { Button };
