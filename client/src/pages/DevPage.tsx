import React, { useState } from "react";
import { Button, Input } from "../UI";
import ListItem from "../UI/list/ListItem";
import InfinityScroll from "../UI/list/InfinityScroll";

const DevPage = () => {
  const [height, setHeight] = useState(100);
  const fetchData = () => {
    setHeight(height + 100);
    // console.log(1222);
  };

  return (
    <div>
      DevPage
      <hr />
      <Button>Кнопка</Button>
      <hr />
      {/* <Input label="Пароль" /> */}
      <ListItem link="/l" label="ad" />
      <hr />
      <InfinityScroll fetchData={fetchData}>
        <p>asd</p>
      </InfinityScroll>
    </div>
  );
};

export { DevPage };
