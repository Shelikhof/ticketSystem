import React, { useEffect, useState } from "react";
import ContentContainer from "../Container/ContentContainer";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
import { ISingleUser } from "../../http/interfaces/IUserResponse.interface";
import UserService from "../../http/UserService";
import ListItemSkeleton from "../../UI/skeletons/ListItemSkeleton";

interface IProp {
  id?: string;
}

const SingleUserPageComponent: React.FC<IProp> = ({ id }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<ISingleUser>();

  const fetchData = async (id: string) => {
    try {
      const data = await UserService.getSingleUser(id);
      setUser(data.data);
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);

  if (id && !user) {
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
        <h2>{id ? user?.fullName : "Добавить персонал"}</h2>
      </div>
      <UserForm user={user} />
    </ContentContainer>
  );
};

export default SingleUserPageComponent;
