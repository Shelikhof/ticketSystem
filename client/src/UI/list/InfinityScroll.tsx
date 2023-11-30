import React, { useEffect, useRef, useState } from "react";
import styles from "./InfinityScroll.module.css";

interface IProp extends React.HTMLProps<HTMLDivElement> {
  fetchData: (page: number, limit?: number) => void;
  setPage: (page: number) => void;
  page: number;
  isOver?: boolean;
}

const InfinityScroll: React.FC<IProp> = ({ children, fetchData, page, setPage, isOver = false }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    const handleIntersection: IntersectionObserverCallback = async (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && !isLoading) {
        setIsLoading(true);

        try {
          setPage(page + 1);
          await fetchData(page);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px 0px 20px 0px",
      threshold: 1,
    });

    if (container) {
      observer.observe(container);
    }

    if (isOver && container) {
      observer.unobserve(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [fetchData, isLoading]);

  return (
    <div className={styles["container"]}>
      {children}
      <div ref={containerRef} className={styles["trigger"]}></div>
    </div>
  );
};

export default InfinityScroll;
