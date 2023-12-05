import React, { useEffect, useState } from "react";
import { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormRegister, UseFormReturn, useForm, useFormState, useWatch } from "react-hook-form";
import { Button, Input } from "../../UI";
import dateValidator from "../../utils/dateValidator";
import Select from "../../UI/forms/Select";
import { IPlatformItem } from "../../http/interfaces/IPlatformResponse.interface";
import PlatformService from "../../http/PlatformService";
import ListItemSkeleton from "../../UI/skeletons/ListItemSkeleton";
import styles from "./StudentForm.module.css";
import { useNavigate } from "react-router-dom";
import StudentService from "../../http/StudentsService";
import { ISingleStudent } from "../../http/interfaces/IStudentsResponse.interface";
import formatDate from "../../utils/formatDate";
import BottomButtons from "../../UI/forms/BottomButtons";

export interface IStudentFields {
  firstName: string;
  lastName: string;
  surName: string;
  birthDate: string;
  gender: string;
  platform: string;
}

interface IProp {
  student?: ISingleStudent;
}

const StudentForm: React.FC<IProp> = ({ student }) => {
  const genders = [
    {
      id: "male",
      title: "Мужской",
    },
    {
      id: "female",
      title: "Женский",
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<IStudentFields>();

  const [platforms, setPlatforms] = useState<IPlatformItem[] | void>();
  const navigate = useNavigate();

  const fetchPlatforms = async () => {
    const data = await PlatformService.getPlatforms();
    setPlatforms(data.data);
  };

  useEffect(() => {
    fetchPlatforms();
    register("gender");
    register("platform");

    //set values if student finds
    if (student) {
      setValue("birthDate", formatDate(new Date(student.birthDate)));
      setValue("firstName", student.firstName);
      setValue("gender", student.gender);
      setValue("lastName", student.lastName);
      setValue("platform", student.platform.id);
      setValue("surName", student.surName);
    }
  }, []);

  const onSubmit: SubmitHandler<IStudentFields> = async (data) => {
    //validate fields
    if (data.gender === undefined) {
      setError("gender", { message: "Поле обязательное" });
    }
    if (data.platform === undefined) {
      setError("platform", { message: "Поле обязательное" });
    }

    //server requests
    try {
      if (student) {
        await StudentService.editStudent(data, student.id);
      } else {
        await StudentService.createStudent(data);
      }
      navigate("/students");
    } catch (error) {
      console.log(error);
    }
  };

  //validate fields if has other errors
  const onError: SubmitErrorHandler<IStudentFields> = () => {
    if (getValues("platform") === undefined) {
      setError("platform", { message: "Поле обязательное" });
    }
    if (getValues("gender") === undefined) {
      setError("gender", { message: "Поле обязательное" });
    }
  };

  const onDelete = async (id: string) => {
    if (confirm("Удалить студента?")) {
      return StudentService.deleteStudent(id).then(() => navigate("/students"));
    }
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className={styles["form-inputs"]}>
        <Input register={register} errors={errors} name="lastName" label="Фамилия" validationRules={{ required: "Поле обязательное" }} />
        <Input register={register} errors={errors} name="firstName" label="Имя" validationRules={{ required: "Поле обязательное" }} />
        <Input register={register} errors={errors} name="surName" label="Отчество" />
        <div className={styles["birthDate-input"]}>
          <Input
            register={register}
            errors={errors}
            name="birthDate"
            label="Дата рождения"
            validationRules={{
              required: "Поле обязательное",
              validate: {
                validDate: (value) => dateValidator(value) || "Введите дату в формате ДД.ММ.ГГГГ",
              },
            }}
          />
        </div>
        <div className={styles["gender-select"]}>
          <Select defaultValue={student?.gender} data={genders} errors={errors} name="gender" label="Пол" setValue={(id) => setValue("gender", id)} clearErrors={clearErrors} />
        </div>
        <div className={styles["platform-select"]}>
          {platforms ? (
            <Select defaultValue={student?.platform.id} data={platforms} errors={errors} name="platform" label="Площадка" setValue={(id) => setValue("platform", id)} clearErrors={clearErrors} />
          ) : (
            <ListItemSkeleton />
          )}
        </div>
      </div>
      <BottomButtons label={{ onCreate: "Добавить студента", onSave: "Сохранить студента" }} link="/students" onDelete={onDelete} item={student} />
    </form>
  );
};

export default StudentForm;
