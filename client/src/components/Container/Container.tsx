import React from "react";
import styles from "./Container.module.css";

interface IProp extends React.HTMLProps<HTMLDivElement> {}

const Container: React.FC<IProp> = ({ children }) => {
  return <div className={styles["container"]}>{children}</div>;
};

export default Container;
