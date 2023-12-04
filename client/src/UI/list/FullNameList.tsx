import React, { useEffect, useState } from "react";
import InfinityScroll from "./InfinityScroll";
import styles from "./FullNameList.module.css";
import ListItem from "./ListItem";
import ListItemSkeleton from "../skeletons/ListItemSkeleton";

interface dataItem {
  id: string;
  fullName: string;
}

interface IProp {
  data: dataItem[] | void;
  fetchData: () => void;
  isOver: boolean;
}

const FullNameList: React.FC<IProp> = ({ data, fetchData, isOver }) => {
  if (typeof data === "undefined") {
    return (
      <div className={styles["list"]}>
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </div>
    );
  }

  return (
    <InfinityScroll fetchData={fetchData} isOver={isOver}>
      <div className={styles["list"]}>
        {data.map((el) => (
          <ListItem label={el.fullName} link={el.id} key={el.id} />
        ))}
      </div>
    </InfinityScroll>
  );
};

export default FullNameList;
