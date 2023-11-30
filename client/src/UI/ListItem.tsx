import React from "react";
import styles from "./ListItem.module.css";
import { useNavigate } from "react-router-dom";
import rightArrow from "../assets/icons/right-arrow.svg";

interface IProp {
  link: string;
  label: string;
}

const ListItem: React.FC<IProp> = ({ link, label }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(link)} className={styles["list-item"]}>
      <span>{label}</span>
      <img src={rightArrow} />
    </div>
  );
};

export default ListItem;
