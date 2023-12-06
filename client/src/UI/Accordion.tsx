import React, { useState } from "react";
import arrowIcon from "../assets/icons/down-arrow.svg";
import styles from "./Accordion.module.css";

interface IProp extends React.HTMLProps<HTMLDivElement> {
  label: string;
  styleType?: "1" | "2";
  defaultOpen?: boolean;
}

const Accordion: React.FC<IProp> = ({ children, label, defaultOpen = false, styleType = 1 }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles[`accordion-${styleType}`]}>
      <div className={styles["label"]} onClick={() => setIsOpen(!isOpen)}>
        <h2>{label}</h2>
        <button>
          <img style={{ rotate: isOpen ? "180deg" : "0deg" }} src={arrowIcon} />
        </button>
      </div>
      {isOpen && <div className={styles["content"]}>{children}</div>}
    </div>
  );
};

export default Accordion;
