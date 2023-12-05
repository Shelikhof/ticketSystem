import React from "react";
import minus from "../../assets/icons/minus.svg";
import styles from "./ItemsList.module.css";

interface IProp {
  data: {
    fullName: string;
    id: string;
  }[];
  hanldeDelete: (id: string) => void;
}

const ItemsList: React.FC<IProp> = ({ data, hanldeDelete }) => {
  return (
    <div className={styles["list"]}>
      {data.map((el) => (
        <p className={styles["item"]} key={el.id}>
          <span>{el.fullName}</span>
          <span className={styles["minus"]} onClick={() => hanldeDelete(el.id)}>
            <img src={minus} />
          </span>
        </p>
      ))}
    </div>
  );
};

export default ItemsList;
