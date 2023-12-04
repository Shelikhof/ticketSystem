import React, { useEffect, useState } from "react";
import ContentContainer from "../Container/ContentContainer";
import styles from "./UsersPageComponent.module.css";
import Select from "../../UI/forms/Select";
import RoleService from "../../http/RoleService";
import { IRoleItem } from "../../http/interfaces/IRolesRespones.interface";
import SearchBar from "../../UI/forms/SearchBar";
import { Button } from "../../UI";
import FullNameList from "../../UI/list/FullNameList";
import UserService from "../../http/UserService";

const UsersPageComponent = () => {
  const [roles, setRoles] = useState<IRoleItem[]>();
  const [selectedRole, setSelectedRole] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isOver, setIsOver] = useState(false);
  const [users, setUsers] = useState<IUserItem[]>();

  const fetchRoles = async () => {
    const rolesData = await RoleService.getRoles();
    setRoles(rolesData.data);
  };

  const onSearch = () => {
    console.log(roles);
    console.log(selectedRole);
    console.log(searchValue);
  };

  const fetchData = async () => {
    console.log(12);
    const usersData = await UserService.getUsers();
    setUsers(usersData.data);
  };

  useEffect(() => {
    fetchRoles();
    fetchData();
  }, []);

  return (
    <ContentContainer>
      <div className={styles["header"]}>
        <h2>Персонал</h2>
        <div className={styles["roles-select"]}>{roles && <Select data={[...roles, { id: "all", title: "Все роли" }]} label="Роль" name="role" setValue={setSelectedRole} defaultValue="all" />}</div>
        <SearchBar value={searchValue} setValue={setSearchValue} onSearch={onSearch} />
        <Button>Добавить персонал</Button>
      </div>
      <FullNameList data={users} isOver={isOver} fetchData={fetchData} />
    </ContentContainer>
  );
};

export default UsersPageComponent;
