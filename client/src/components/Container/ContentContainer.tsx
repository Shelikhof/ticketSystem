import React from "react";
import styles from "./ContentContainer.module.css";

interface IProp extends React.HTMLProps<HTMLDivElement> {}

const ContentContainer: React.FC<IProp> = ({ children }) => {
  return <div className={styles["content-container"]}>{children}</div>;
};

export default ContentContainer;
