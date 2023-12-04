import React, { useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";
import downArrow from "../../assets/icons/down-arrow.svg";
import { FieldErrors, UseFormClearErrors } from "react-hook-form";

interface dataItem {
  id: string;
  title: string;
}

interface IProp {
  data: dataItem[];
  setValue: (value: string) => void;
  label: string;
  errors: FieldErrors;
  name: string;
  clearErrors: UseFormClearErrors<any>;
  defaultValue?: string;
}

const Select: React.FC<IProp> = ({ data, setValue, label, errors, name, clearErrors, defaultValue }) => {
  const [option, setOption] = useState<dataItem | void>();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  //handle click on select list
  const onClick = (el: dataItem) => {
    clearErrors(name);
    setValue(el.id);
    setOption(el);
    setIsOpen(false);
  };

  //close option if click outside
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setOption(data.find((el) => el.id === defaultValue));
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const inputClassName = errors[name] ? "select-error" : "select";

  return (
    <div className={styles["option-container"]} ref={selectRef}>
      <div className={styles[inputClassName]} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles["option-label"]}>
          <span className={styles[option?.title ? "label-small" : ""]}>{label}</span>
          <p>{option?.title}</p>
        </div>
        <img src={downArrow} style={{ rotate: isOpen ? "180deg" : "" }} />
      </div>
      {isOpen && (
        <div className={styles["option-list"]}>
          {data.map((el) => (
            <p onClick={() => onClick(el)} key={el.id}>
              {el.title}
            </p>
          ))}
        </div>
      )}
      {errors[name] && <p className={styles["error-message"]}>{String(errors[name]?.message)}</p>}
    </div>
  );
};

export default Select;
