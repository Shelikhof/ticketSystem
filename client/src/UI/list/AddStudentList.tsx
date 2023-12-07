import React from "react";
import { IStudentItem } from "../../http/interfaces/IStudentsResponse.interface";
import plusIcon from "../../assets/icons/plus.svg";
import styles from "./AddStudentList.module.css";

interface IProp {
  students: IStudentItem[];
  addedStudents: IStudentItem[];
  handleClick: (item: IStudentItem) => void;
}

const AddStudentList: React.FC<IProp> = ({ students, addedStudents, handleClick }) => {
  return (
    <div className={styles["list"]}>
      {students.map((el) => (
        <div className={styles["item"]} key={el.id} onClick={() => handleClick(el)}>
          <p>{el.fullName}</p>
          <button>
            <img style={{ rotate: addedStudents.includes(el) ? "45deg" : "0deg" }} src={plusIcon} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddStudentList;
