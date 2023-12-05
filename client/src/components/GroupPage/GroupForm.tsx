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

interface IGroupFields {
  name: string;
  platformId: string;
  curatorId: string;
  students: string[];
}

const GroupForm = () => {
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

  const fetchPlatforms = async () => {
    const data = await PlatformService.getPlatforms();
    setPlatforms(data.data);
  };

  useEffect(() => {
    fetchPlatforms();
    register("students");
  }, []);

  const onSubmit: SubmitHandler<IGroupFields> = (data) => {
    if (data.curatorId === undefined) {
      setError("curatorId", { message: "Поле обязательное" });
    }
    if (data.platformId === undefined) {
      setError("platformId", { message: "Поле обязательное" });
    }
    console.log(data);
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

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className={styles["top-inputs"]}>
        <div className={styles["name-input"]}>
          <Input register={register} errors={errors} name="name" label="Название" validationRules={{ required: "Поле обязательное" }} />
        </div>
        {platforms ? <Select data={platforms} errors={errors} name="platformId" label="Площадка" setValue={(id) => setValue("platformId", id)} clearErrors={clearErrors} /> : <ListItemSkeleton />}
        <SearchSelect label="Куратор" fetchData={fetchDataCurator} onSelect={handleCuratorSelect} errors={errors} clearErrors={clearErrors} name="curatorId" />
      </div>
      <SearchSelect label="Студент" fetchData={fetchDataStudents} onSelect={hanldeStudentSelect} />
      {students && <ItemsList data={students} hanldeDelete={hanldeStudentDelete} />}
      <div className={styles["buttons"]}>
        <BottomButtons label={{ onCreate: "Добавить группу", onSave: "Сохранить группу" }} link="/groups" onDelete={() => console.log(12)} />
      </div>
    </form>
  );
};

export default GroupForm;
