import React, { useEffect, useState } from "react";
import ContentContainer from "../Container/ContentContainer";
import GroupForm from "./GroupForm";
import { useNavigate } from "react-router-dom";
import { ISingleGroup } from "../../http/interfaces/IGroupResponse.interface";
import GroupService from "../../http/GroupService";
import ListItemSkeleton from "../../UI/skeletons/ListItemSkeleton";

interface IProp {
  id?: string;
}

const SingleGroupPageComponent: React.FC<IProp> = ({ id }) => {
  const navigate = useNavigate();
  const [group, setGroup] = useState<ISingleGroup>();

  const fetchData = async (id: string) => {
    try {
      const data = await GroupService.getSingleGroup(id);
      setGroup(data.data);
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);

  if (id && !group) {
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

  return (
    <ContentContainer>
      <div>
        <h2>{id ? group?.title : "Добавить группу"}</h2>
      </div>
      <GroupForm group={group} />
    </ContentContainer>
  );
};

export default SingleGroupPageComponent;
