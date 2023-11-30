import React from "react";
import styles from "./Button.module.css";

interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // isRed?: boolean;
  btnStyle?: "red" | "gray" | "default";
}

const Button: React.FC<IProp> = ({ btnStyle = "default", children, ...props }) => {
  return (
    <button {...props} className={styles[`button-${btnStyle}`]}>
      {children}
    </button>
  );
};

export { Button };
