import React from "react";
import { Button } from "..";
import { Link } from "react-router-dom";
import styles from "./TicketItem.module.css";
import { useAppSelector } from "../../store/hook";

interface IProp {
  title: string;
  certificateTitle: string;
  ticketStatus: "pending" | "completed" | "finished";
  link: string;
  onDelete?: () => void;
}

const TicketItem: React.FC<IProp> = ({ certificateTitle, link, ticketStatus, title, onDelete }) => {
  const { role } = useAppSelector((data) => data.auth);

  return (
    <div className={styles["item-container"]}>
      <div className={styles["left-side"]}>
        <h3>{title}</h3>
        <p>
          <span>Тип справки: </span>
          <span>{certificateTitle}</span>
        </p>
      </div>
      <div className={styles["buttons"]}>
        {ticketStatus === "pending" && role === "Преподаватель" && (
          <Button btnStyle="red" onClick={onDelete}>
            Отозвать
          </Button>
        )}
        <Link to={link}>
          <Button>Перейти</Button>
        </Link>
      </div>
    </div>
  );
};

export default TicketItem;
