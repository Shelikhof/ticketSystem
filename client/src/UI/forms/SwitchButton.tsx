import React, { useState } from "react";
import styles from "./SwitchButton.module.css";

interface IProp {
  id: string;
  isDisabled?: boolean;
  onChange: (bool: boolean, id: string) => void;
  isChecked: boolean;
}

const SwitchButton: React.FC<IProp> = ({ id, onChange, isDisabled = false, isChecked }) => {
  const [isCheckedEl, setIsCheckedEL] = useState(isChecked);

  return (
    <label className={styles["switch"]}>
      <input
        checked={isCheckedEl}
        onChange={(event) => {
          onChange(event.target.checked, id);
          setIsCheckedEL(!isCheckedEl);
        }}
        disabled={isDisabled}
        type="checkbox"
      />
      <span></span>
    </label>
  );
};

export default SwitchButton;
