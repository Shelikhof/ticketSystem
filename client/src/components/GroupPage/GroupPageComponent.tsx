import React, { useEffect, useState } from "react";
import { IGroupItem } from "../../http/interfaces/IGroupResponse.interface";
import ContentContainer from "../Container/ContentContainer";
import SearchBar from "../../UI/forms/SearchBar";
import { Button } from "../../UI";
import ColumnList from "../../UI/list/ColumnList";
import { useNavigate } from "react-router-dom";
import styles from "./GroupPageComponent.module.css";
import GroupService from "../../http/GroupService";

const GroupPageComponent = () => {
  const LIMIT = 10;
  const [groups, setGroups] = useState<IGroupItem[]>();
  const [page, setPage] = useState(1);
  const [isOver, setIsOver] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await GroupService.getGroups(LIMIT, page, searchValue);
    if (data.data.count <= data.data.limit * data.data.page) {
      setIsOver(true);
    }
    setGroups([...(groups || []), ...data.data.groups]);
    setPage((prev) => prev + 1);
  };

  const onSearch = () => {
    setPage(1);
    setIsOver(false);
    setGroups([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentContainer>
      <div className={styles["header"]}>
        <h2>Группы</h2>
        <SearchBar setValue={setSearchValue} value={searchValue} onSearch={onSearch} />
        <Button onClick={() => navigate("add")}>Добавить группу</Button>
      </div>
      <ColumnList columnCount="4" data={groups} isOver={isOver} fetchData={fetchData} />
    </ContentContainer>
  );
};

export default GroupPageComponent;
