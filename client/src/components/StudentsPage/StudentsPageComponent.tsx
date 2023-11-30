import React, { useState } from "react";
import ContentContainer from "../Container/ContentContainer";
import { Button } from "../../UI";
import StudentsList from "./StudentsList";
import { IStudentItem } from "../../http/interfaces/IStudentsResponse.interface";

const StudentsPageComponent = () => {
  return (
    <ContentContainer>
      <div>
        <h2>Студенты</h2>
        <Button>Добавить студента</Button>
      </div>
      <StudentsList />
    </ContentContainer>
  );
};

export default StudentsPageComponent;
