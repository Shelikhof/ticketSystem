import React, { useEffect, useState } from "react";
import ContentContainer from "../Container/ContentContainer";
import styles from "./UsersPageComponent.module.css";
import Select from "../../UI/forms/Select";
import RoleService from "../../http/RoleService";
import { IRoleItem } from "../../http/interfaces/IRolesRespones.interface";
import SearchBar from "../../UI/forms/SearchBar";
import { Button } from "../../UI";
import FullNameList from "../../UI/list/ColumnList";
import UserService from "../../http/UserService";
import { useNavigate } from "react-router-dom";
import { IUserItem } from "../../http/interfaces/IUserResponse.interface";

const UsersPageComponent = () => {
  const LIMIT = 3;
  const [roles, setRoles] = useState<IRoleItem[]>();
  const [selectedRole, setSelectedRole] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isOver, setIsOver] = useState(false);
  const [users, setUsers] = useState<IUserItem[]>();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchRoles = async () => {
    const rolesData = await RoleService.getRoles();
    setRoles(rolesData.data);
  };

  const onSearch = () => {
    setIsOver(false);
    setPage(1);
    setUsers([]);
  };

  const fetchData = async () => {
    const usersData = await UserService.getUsers(searchValue, selectedRole, LIMIT, page);
    if (usersData.data.count <= usersData.data.limit * usersData.data.page) {
      setIsOver(true);
    }
    setUsers([...(users || []), ...usersData.data.users]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchRoles();
    fetchData();
  }, []);

  const onChangeRole = (id: string) => {
    setSelectedRole(id);
    setIsOver(false);
    setPage(1);
    setUsers([]);
  };

  return (
    <ContentContainer>
      <div className={styles["header"]}>
        <h2>Персонал</h2>
        <div className={styles["roles-select"]}>{roles && <Select data={[...roles, { id: "all", title: "Все роли" }]} label="Роль" name="role" setValue={onChangeRole} defaultValue="all" />}</div>
        <SearchBar value={searchValue} setValue={setSearchValue} onSearch={onSearch} />
        <Button onClick={() => navigate("add")}>Добавить персонал</Button>
      </div>
      <FullNameList data={users} isOver={isOver} fetchData={fetchData} />
    </ContentContainer>
  );
};

export default UsersPageComponent;
