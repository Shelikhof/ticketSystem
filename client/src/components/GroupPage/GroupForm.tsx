import React, { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, set, useForm } from "react-hook-form";
import { IPlatformItem } from "../../http/interfaces/IPlatformResponse.interface";
import PlatformService from "../../http/PlatformService";
import { Input } from "../../UI";
import Select from "../../UI/forms/Select";
import ListItemSkeleton from "../../UI/skeletons/ListItemSkeleton";
import SearchSelect from "../../UI/forms/SearchSelect";
import UserService from "../../http/UserService";
import { IUserItem } from "../../http/interfaces/IUserResponse.interface";
import StudentService from "../../http/StudentsService";
import ItemsList from "../../UI/list/ItemsList";
import { IStudentItem } from "../../http/interfaces/IStudentsResponse.interface";
import styles from "./GroupForm.module.css";
import BottomButtons from "../../UI/forms/BottomButtons";
import { ISingleGroup } from "../../http/interfaces/IGroupResponse.interface";
import { useNavigate } from "react-router-dom";
import GroupService from "../../http/GroupService";

export interface IGroupFields {
  name: string;
  platformId: string;
  curatorId: string;
  students: string[];
}

interface IProp {
  group?: ISingleGroup;
}

const GroupForm: React.FC<IProp> = ({ group }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<IGroupFields>();
  const [platforms, setPlatforms] = useState<IPlatformItem[] | void>();
  const [students, setStudents] = useState<IStudentItem[]>([]);
  const navigate = useNavigate();

  const fetchPlatforms = async () => {
    const data = await PlatformService.getPlatforms();
    setPlatforms(data.data);
  };

  useEffect(() => {
    fetchPlatforms();
    register("students");

    if (group) {
      setValue("curatorId", group.curator.id);
      setValue("name", group.title);
      setValue("platformId", group.platform.id);
      setValue(
        "students",
        group.students.map((el) => el.id)
      );
      setStudents(group.students);
      handleCuratorSelect(group.curator);
    }
  }, []);

  const onSubmit: SubmitHandler<IGroupFields> = async (data) => {
    if (data.curatorId === undefined) {
      setError("curatorId", { message: "Поле обязательное" });
    }
    if (data.platformId === undefined) {
      setError("platformId", { message: "Поле обязательное" });
    }

    try {
      if (group) {
        await GroupService.editGroup(group.id, data);
      } else {
        await GroupService.createGroup(data);
      }
      navigate("/groups");
    } catch (error) {
      console.log(error);
    }
  };

  const onError: SubmitErrorHandler<IGroupFields> = () => {
    if (getValues("curatorId") === undefined) {
      setError("curatorId", { message: "Поле обязательное" });
    }
    if (getValues("platformId") === undefined) {
      setError("platformId", { message: "Поле обязательное" });
    }
  };

  const fetchDataCurator = async (searchValue: string): Promise<IUserItem[]> => {
    const data = await UserService.getTeachersBySearch(searchValue);
    return data.data;
  };

  const fetchDataStudents = async (searchValue: string): Promise<IUserItem[]> => {
    const data = await StudentService.getFreeStudents(searchValue);
    return data.data;
  };

  const handleCuratorSelect = (item: IUserItem) => {
    setValue("curatorId", item.id);
  };

  const hanldeStudentSelect = (item: IStudentItem) => {
    const current = getValues("students") || [];
    if (!current.includes(item.id)) {
      current.push(item.id);
      setStudents([...students, item]);
    }
    setValue("students", current);
  };

  const hanldeStudentDelete = (id: string) => {
    setStudents(students.filter((el) => el.id !== id));
    const value = getValues("students").filter((el) => el !== id);
    setValue("students", value);
  };

  const onDelete = async (id: string) => {
    if (confirm("Удалить группу?")) {
      return GroupService.deleteGroup(id).then(() => navigate("/groups"));
    }
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className={styles["top-inputs"]}>
        <div className={styles["name-input"]}>
          <Input register={register} errors={errors} name="name" label="Название" validationRules={{ required: "Поле обязательное" }} />
        </div>
        {platforms ? (
          <Select defaultValue={group?.platform.id} data={platforms} errors={errors} name="platformId" label="Площадка" setValue={(id) => setValue("platformId", id)} clearErrors={clearErrors} />
        ) : (
          <ListItemSkeleton />
        )}
        <SearchSelect defaultValue={group?.curator.fullName} label="Куратор" fetchData={fetchDataCurator} onSelect={handleCuratorSelect} errors={errors} clearErrors={clearErrors} name="curatorId" />
      </div>
      <SearchSelect label="Студент" fetchData={fetchDataStudents} onSelect={hanldeStudentSelect} />
      {students.length > 0 && <h3 style={{ marginTop: "30px" }}>Список студентов</h3>}
      {students && <ItemsList data={students} hanldeDelete={hanldeStudentDelete} />}
      <div className={styles["buttons"]}>
        <BottomButtons item={group} label={{ onCreate: "Добавить группу", onSave: "Сохранить группу" }} link="/groups" onDelete={onDelete} />
      </div>
    </form>
  );
};

export default GroupForm;
