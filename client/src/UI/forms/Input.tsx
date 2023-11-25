import React from "react";
import styles from "./Input.module.css";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

interface IProp extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  validationRules?: RegisterOptions;
}

const Input: React.FC<IProp> = ({ validationRules, register, errors, name, label, ...props }) => {
  const inputClassName = errors[name] ? "input-error" : "input";

  return (
    <div className={styles["input-container"]}>
      <input {...register(name, validationRules)} {...props} className={styles[inputClassName]} placeholder="" />
      <span className={styles["label"]}>{label}</span>
      {errors[name] && <span className={styles["error-message"]}>{String(errors[name]?.message)}</span>}
    </div>
  );
};

export { Input };
