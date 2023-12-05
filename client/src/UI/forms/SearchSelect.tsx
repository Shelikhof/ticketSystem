import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchSelect.module.css";
import { FieldErrors, UseFormClearErrors } from "react-hook-form";

interface IProp {
  label: string;
  fetchData: (q: string) => Promise<IResultItem[]>;
  onSelect: (item: IResultItem) => void;
  name?: string;
  errors?: FieldErrors;
  clearErrors?: UseFormClearErrors<any>;
}

interface IResultItem {
  fullName: string;
  id: string;
}

const SearchSelect: React.FC<IProp> = ({ label, fetchData, onSelect, clearErrors, errors, name }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<IResultItem[]>();
  const [value, setValue] = useState("");

  useEffect(() => {
    // if (defaultValue) {
    //   setOption(data.find((el) => el.id === defaultValue));
    // }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onChange = async (value: string) => {
    const data = await fetchData(value);
    if (data) {
      setResult(data);
    }
    setValue(value);
    setIsOpen(true);
  };

  const handleSelect = (item: IResultItem) => {
    setValue(item.fullName);
    onSelect(item);
    setIsOpen(false);
    if (clearErrors) {
      clearErrors(name);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  let inputClassName = "input";

  if (errors) {
    inputClassName = errors[name || ""] ? "input-error" : "input";
  }

  return (
    <div className={styles["searchSelect-container"]} ref={selectRef}>
      <input className={styles[inputClassName]} placeholder="" value={value} onChange={(event) => onChange(event.target.value)} />
      <span className={styles["label"]}>{label}</span>
      {isOpen && (result?.length || 0 > 0) && (
        <div className={styles["result"]}>
          {result &&
            result.map((el) => (
              <p onClick={() => handleSelect(el)} key={el.id}>
                {el.fullName}
              </p>
            ))}
        </div>
      )}
      {errors && errors[name || ""] && <p className={styles["error-message"]}>{String(errors[name || ""]?.message)}</p>}
    </div>
  );
};

export default SearchSelect;
