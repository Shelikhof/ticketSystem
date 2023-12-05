import React, { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../UI";
import RoleService from "../../http/RoleService";
import { IRoleItem } from "../../http/interfaces/IRolesRespones.interface";
import PlatformService from "../../http/PlatformService";
import { IPlatformItem } from "../../http/interfaces/IPlatformResponse.interface";
import Select from "../../UI/forms/Select";
import UserService from "../../http/UserService";
import ErrorAlert from "../../UI/forms/Error";
import { AxiosError } from "axios";
import { IError } from "../../interfaces/IError.interface";
import styles from "./UserForm.module.css";
import BottomButtons from "../../UI/forms/BottomButtons";
import { useNavigate } from "react-router-dom";
import { ISingleUser } from "../../http/interfaces/IUserResponse.interface";

export interface IUserFields {
  roleId: string;
  lastName: string;
  firstName: string;
  surName: string;
  telNum: string;
  platformId: string;
  login: string;
  password: string;
}

interface IProp {
  user?: ISingleUser;
}

const UserForm: React.FC<IProp> = ({ user }) => {
  const [platforms, setPlatforms] = useState<IPlatformItem[]>();
  const [roles, setRoles] = useState<IRoleItem[]>();
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<IUserFields>();

  const fetchRolesAndPlatforms = async () => {
    const rolesData = await RoleService.getRoles();
    setRoles(rolesData.data);
    const platformData = await PlatformService.getPlatforms();
    setPlatforms(platformData.data);
  };

  useEffect(() => {
    fetchRolesAndPlatforms();
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("login", user.login);
      setValue("platformId", user.platform.id);
      setValue("roleId", user.role.id);
      setValue("surName", user.surName || "");
      setValue("telNum", user.telNum);
    }
  }, []);

  const onSubmit: SubmitHandler<IUserFields> = async (data) => {
    if (data.roleId === undefined) {
      setError("roleId", { message: "Поле обязательное" });
    }
    if (data.platformId === undefined) {
      setError("platformId", { message: "Поле обязательное" });
    }

    try {
      if (user) {
        await UserService.editUser(data, user.id);
      } else {
        await UserService.createUser(data);
      }
      navigate("/users");
    } catch (e) {
      const error = e as AxiosError<IError>;
      setFormError(error.response?.data?.message || "");
      console.log(error);
    }
  };

  const onError: SubmitErrorHandler<IUserFields> = () => {
    if (getValues("platformId") === undefined) {
      setError("platformId", { message: "Поле обязательное" });
    }
    if (getValues("roleId") === undefined) {
      setError("roleId", { message: "Поле обязательное" });
    }
  };

  const onDelete = (id: string) => {
    if (confirm("Удалить персонал?")) {
      return UserService.deleteUser(id).then(() => navigate("/users"));
    }
    return;
  };

  const validationRulesPassword = user ? {} : { required: "Поле обязательное" };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className={styles["form-inputs"]}>
        <Input register={register} errors={errors} name="lastName" label="Фамилия" validationRules={{ required: "Поле обязательное" }} />
        <Input register={register} errors={errors} name="firstName" label="Имя" validationRules={{ required: "Поле обязательное" }} />
        <Input register={register} errors={errors} name="surName" label="Отчество" />
        <Input
          register={register}
          errors={errors}
          name="telNum"
          label="Номер телефона"
          validationRules={{
            required: "Поле обязательное",
            pattern: {
              value: /^\d{10}$/,
              message: "Введите 10 цифр номера телефона",
            },
          }}
        />
        {platforms && (
          <Select defaultValue={user?.platform.id} data={platforms} errors={errors} name="platformId" label="Площадка" setValue={(id) => setValue("platformId", id)} clearErrors={clearErrors} />
        )}
        {roles && <Select defaultValue={user?.role.id} data={roles} errors={errors} name="roleId" label="Роль" setValue={(id) => setValue("roleId", id)} clearErrors={clearErrors} />}
        <Input register={register} errors={errors} name="login" label="Логин" validationRules={{ required: "Поле обязательное" }} />
        <Input register={register} errors={errors} name="password" label="Пароль" validationRules={validationRulesPassword} />
        <div className={styles["form-error"]}>{formError && <ErrorAlert error={formError} />}</div>
      </div>
      <BottomButtons label={{ onCreate: "Добавить персонал", onSave: "Сохранить персонал" }} link="/users" item={user} onDelete={onDelete} />
    </form>
  );
};

export default UserForm;
