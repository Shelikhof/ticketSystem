import React from "react";
import { IStudentItem } from "../../http/interfaces/IStudentsResponse.interface";
import plusIcon from "../../assets/icons/plus.svg";
import styles from "./AddStudentList.module.css";

interface IProp {
  students: IStudentItem[];
  // addedStudents: IStudentItem[];
}

const AddStudentList: React.FC<IProp> = ({ students }) => {
  return (
    <div className={styles["list"]}>
      {students.map((el) => (
        <div className={styles["item"]} key={el.id}>
          <p>{el.fullName}</p>
          <button>
            <img src={plusIcon} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddStudentList;
