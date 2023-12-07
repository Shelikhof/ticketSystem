import React from "react";
import styles from "./Label.module.css";

interface IProp {
  label: string;
  value: string;
}

const Label: React.FC<IProp> = ({ label, value }) => {
  return (
    <div className={styles["label"]}>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
};

export default Label;
