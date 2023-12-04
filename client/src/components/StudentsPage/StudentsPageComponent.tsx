import React, { useEffect, useState } from "react";
import ContentContainer from "../Container/ContentContainer";
import { Button } from "../../UI";
import StudentsList from "./StudentsList";
import { IStudentItem } from "../../http/interfaces/IStudentsResponse.interface";
import SearchBar from "../../UI/forms/SearchBar";
import StudentService from "../../http/StudentsService";
import styles from "./StudentsPageComponent.module.css";
import { useNavigate } from "react-router-dom";

const StudentsPageComponent = () => {
  const LIMIT = 3;
  const [students, setStudents] = useState<IStudentItem[] | void>();
  const [page, setPage] = useState(1);
  const [isOver, setIsOver] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await StudentService.getStudents(LIMIT, page, searchValue);
    if (data.data.count <= data.data.limit * data.data.page) {
      setIsOver(true);
    }
    setStudents([...(students || []), ...data.data.students]);
    setPage((prev) => prev + 1);
  };

  //handle click on searchbar
  const onSearch = () => {
    setPage(1);
    setIsOver(false);
    setStudents([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentContainer>
      <div className={styles["header"]}>
        <h2>Студенты</h2>
        <SearchBar setValue={setSearchValue} value={searchValue} onSearch={onSearch} />
        <Button onClick={() => navigate("add")}>Добавить студента</Button>
      </div>
      <StudentsList students={students} isOver={isOver} fetchData={fetchData} />
    </ContentContainer>
  );
};

export default StudentsPageComponent;
