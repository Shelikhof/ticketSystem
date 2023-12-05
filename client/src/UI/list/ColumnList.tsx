import React, { useEffect, useState } from "react";
import InfinityScroll from "./InfinityScroll";
import styles from "./ColumnList.module.css";
import ListItem from "./ListItem";
import ListItemSkeleton from "../skeletons/ListItemSkeleton";

interface dataItem {
  id: string;
  fullName?: string;
  title?: string;
}

interface IProp {
  data: dataItem[] | void;
  fetchData: () => void;
  isOver: boolean;
  columnCount?: "2" | "4";
}

const ColumnList: React.FC<IProp> = ({ data, fetchData, isOver, columnCount = 2 }) => {
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
      <div className={styles[`list-${columnCount}`]}>
        {data.map((el) => (
          <ListItem label={el.fullName || el.title || ""} link={el.id} key={el.id} />
        ))}
      </div>
    </InfinityScroll>
  );
};

export default ColumnList;
