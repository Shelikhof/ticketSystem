import React, { useState } from "react";
import InfinityScroll from "../../UI/list/InfinityScroll";
import { IStudentItem } from "../../http/interfaces/IStudentsResponse.interface";
import StudentService from "../../http/StudentsService";
import styles from "./StudentsList.module.css";
import ListItem from "../../UI/list/ListItem";

const StudentsList = () => {
  const LIMIT = 3;
  const [students, setStudents] = useState<IStudentItem[]>([]);
  const [page, setPage] = useState(1);
  const [isOver, setIsOver] = useState(false);

  const fetchData = async (page: number, limit = LIMIT) => {
    const data = await StudentService.getStudents(limit, page);
    if (data.data.count <= data.data.limit * data.data.page) {
      setIsOver(true);
    }
    setStudents([...students, ...data.data.students]);
  };

  return (
    <InfinityScroll page={page} setPage={setPage} fetchData={fetchData} isOver={isOver}>
      <div className={styles["list"]}>
        {students.map((el) => (
          <ListItem label={el.fullName} link={el.id} key={el.id} />
        ))}
      </div>
    </InfinityScroll>
  );
};

export default StudentsList;
