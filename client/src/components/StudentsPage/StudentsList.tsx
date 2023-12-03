import React, { useEffect, useState } from "react";
import InfinityScroll from "../../UI/list/InfinityScroll";
import { IStudentItem } from "../../http/interfaces/IStudentsResponse.interface";
import StudentService from "../../http/StudentsService";
import styles from "./StudentsList.module.css";
import ListItem from "../../UI/list/ListItem";
import ListItemSkeleton from "../../UI/skeletons/ListItemSkeleton";

interface IProp {
  students: IStudentItem[] | void;
  fetchData: () => void;
  isOver: boolean;
}

const StudentsList: React.FC<IProp> = ({ students, fetchData, isOver }) => {
  if (typeof students === "undefined") {
    return (
      <div className={styles["list"]}>
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </div>
    );
  }

  return (
    <InfinityScroll fetchData={fetchData} isOver={isOver}>
      <div className={styles["list"]}>
        {students.map((el) => (
          <ListItem label={el.fullName} link={el.id} key={el.id} />
        ))}
      </div>
    </InfinityScroll>
  );
};

export default StudentsList;
