import React from "react";
import styles from "./ListItem.module.css";
import { Link } from "react-router-dom";
import rightArrow from "../../assets/icons/right-arrow.svg";

interface IProp {
  link: string;
  label: string;
}

const ListItem: React.FC<IProp> = ({ link, label }) => {
  return (
    <Link to={link}>
      <div className={styles["list-item"]}>
        <span>{label}</span>
        <img src={rightArrow} />
      </div>
    </Link>
  );
};

export default ListItem;
