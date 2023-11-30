import React from "react";
import styles from "./Error.module.css";

interface IProp {
  error: string;
}

const ErrorAlert: React.FC<IProp> = ({ error }) => {
  return <p className={styles["error"]}>{error}</p>;
};

export default ErrorAlert;
