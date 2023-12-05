import React from "react";
import ContentContainer from "../Container/ContentContainer";
import GroupForm from "./GroupForm";

const SingleGroupPageComponent = () => {
  return (
    <ContentContainer>
      <div>
        <h2>Добавить группу</h2>
      </div>
      <GroupForm />
    </ContentContainer>
  );
};

export default SingleGroupPageComponent;
