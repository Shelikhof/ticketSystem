import React from "react";
import styles from "./BottomButtons.module.css";
import { Button } from "..";
import { useNavigate } from "react-router-dom";

interface IProp {
  item?: {
    id: string;
  };
  link: string;
  onDelete: (str: string) => void;
  label: {
    onSave: string;
    onCreate: string;
  };
}

const BottomButtons: React.FC<IProp> = ({ item, link, onDelete, label }) => {
  const navigate = useNavigate();

  return (
    <div className={styles["buttons"]}>
      <Button btnStyle="gray" type="button" onClick={() => navigate(link)}>
        Отмена
      </Button>
      {item && (
        <Button btnStyle="red" type="button" onClick={() => onDelete(item?.id)}>
          Удалить
        </Button>
      )}
      {item ? <Button type="submit">{label.onSave}</Button> : <Button type="submit">{label.onCreate}</Button>}
    </div>
  );
};

export default BottomButtons;
