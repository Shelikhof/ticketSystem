import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../../UI";
import styles from "./CertificateForm.module.css";
import { useNavigate } from "react-router-dom";
import CertificateService from "../../http/CertificateService";
import { AxiosError } from "axios";
import { IError } from "../../interfaces/IError.interface";
import ErrorAlert from "../../UI/forms/Error";
import BottomButtons from "../../UI/forms/BottomButtons";

interface ICertificateFields {
  id: string;
  title: string;
}

interface IProp {
  certificate?: ICertificateFields;
}

const CertificateForm: React.FC<IProp> = ({ certificate }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICertificateFields>();

  useEffect(() => {
    if (certificate) {
      setValue("title", certificate.title);
    }
  });

  const onSubmit: SubmitHandler<ICertificateFields> = async (data) => {
    try {
      if (certificate) {
        await CertificateService.editCertificate(data, certificate.id);
      } else {
        await CertificateService.createCertificate(data.title);
      }
      navigate("/certificates");
    } catch (e) {
      const error = e as AxiosError<IError>;
      setError(error.response?.data?.message || "");
      console.log(error);
    }
  };

  const onDelete = (id: string) => {
    if (confirm("Удалить справку?")) {
      return CertificateService.deleteCertificate(id).then(() => navigate("/certificates"));
    }
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["input-wrapper"]}>
        <Input register={register} errors={errors} name="title" label="Наименование справки" validationRules={{ required: "Поле обязательное" }} />
        {error && <ErrorAlert error={error} />}
      </div>

      {/* <div className={styles["buttons"]}>
        <Button btnStyle="gray" type="button" onClick={() => navigate("/certificates")}>
          Отмена
        </Button>
        {certificate && (
          <Button btnStyle="red" type="button" onClick={() => onDelete(certificate.id)}>
            Удалить
          </Button>
        )}
        {certificate ? <Button type="submit">Сохранить справку</Button> : <Button type="submit">Добавить справку</Button>}
      </div> */}
      <BottomButtons link="/certificates" onDelete={onDelete} item={certificate} label={{ onCreate: "Добавить справку", onSave: "Сохранить справку" }} />
    </form>
  );
};

export default CertificateForm;
