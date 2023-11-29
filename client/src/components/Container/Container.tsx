import React from "react";
import styles from "./Container.module.css";

interface IProp extends React.HTMLProps<HTMLDivElement> {
  isSmall?: boolean;
}

const Container: React.FC<IProp> = ({ isSmall = false, children }) => {
  return <div className={isSmall ? styles["small-container"] : styles["container"]}>{children}</div>;
};

export default Container;
