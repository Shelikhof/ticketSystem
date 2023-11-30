import React from "react";
import { ICertificateItem } from "../../http/interfaces/ICertificatesRespones.interface";
import styles from "./CertificateList.module.css";
import ListItemSkeleton from "../../UI/skeletons/ListItemSkeleton";
import ListItem from "../../UI/list/ListItem";

interface IProp {
  certificates: ICertificateItem[] | void;
}

const CertificateList: React.FC<IProp> = ({ certificates }) => {
  if (!certificates) {
    return (
      <div className={styles["list"]}>
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </div>
    );
  }
  return <div className={styles["list"]}>{certificates && certificates.map((el) => <ListItem label={el.title} link={`${el.id}`} key={el.id} />)}</div>;
};

export default CertificateList;
