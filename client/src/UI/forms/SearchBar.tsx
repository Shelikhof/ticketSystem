import React, { useState } from "react";
import searchIcon from "../../assets/icons/search-icon.svg";
import styles from "./SearchBar.module.css";

interface IProp {
  onSearch: () => void;
  value: string;
  setValue: (value: string) => void;
}

const SearchBar: React.FC<IProp> = ({ onSearch, setValue, value }) => {
  return (
    <div className={styles["searchBar-container"]}>
      <input className={styles["input"]} placeholder="" value={value || ""} onChange={(event) => setValue(event.target.value)} />
      <span className={styles["label"]}>Поиск</span>
      <button className={styles["button"]} onClick={onSearch}>
        <img src={searchIcon} />
      </button>
    </div>
  );
};

export default SearchBar;
