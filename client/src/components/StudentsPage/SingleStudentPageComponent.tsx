import React, { useEffect, useState } from "react";
import styles from "./AddStudentPageComponent.module.css";
import ContentContainer from "../Container/ContentContainer";
import StudentForm from "./StudentForm";
import { useNavigate } from "react-router-dom";
import { ISingleStudent } from "../../http/interfaces/IStudentsResponse.interface";
import StudentService from "../../http/StudentsService";
import ListItemSkeleton from "../../UI/skeletons/ListItemSkeleton";

interface IProp {
  id?: string;
}

const SingleStudentPageComponent: React.FC<IProp> = ({ id }) => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<ISingleStudent>();

  const fetchData = async (id: string) => {
    try {
      const data = await StudentService.getSingleStudent(id);
      setStudent(data.data);
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);

  if (id && !student) {
    return (
      <ContentContainer>
        <div>
          <ListItemSkeleton />
        </div>
        <div>
          <ListItemSkeleton />
          <ListItemSkeleton />
        </div>
      </ContentContainer>
    );
  }

  //create header title with student name and his group name
  let headerTitle = "";
  if (id) {
    headerTitle = `${student?.fullName}`;
    if (student?.group) {
      headerTitle += ` | ${student.group.name}`;
    }
  }

  return (
    <ContentContainer>
      <div>
        <h2>{id ? headerTitle : "Добавить студента"}</h2>
      </div>
      <StudentForm student={student} />
    </ContentContainer>
  );
};

export default SingleStudentPageComponent;
