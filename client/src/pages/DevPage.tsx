import React, { useState } from "react";
import { Button, Input } from "../UI";
import ListItem from "../UI/list/ListItem";
import InfinityScroll from "../UI/list/InfinityScroll";
import SearchBar from "../UI/forms/SearchBar";

const DevPage = () => {
  const [height, setHeight] = useState(100);
  const fetchData = (q: string) => {
    // setHeight(height + 100);
    console.log(q);
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
      {/* <InfinityScroll fetchData={fetchData}> */}
      {/* <p>asd</p> */}
      {/* </InfinityScroll> */}
      <SearchBar onSearch={fetchData} />
    </div>
  );
};

export { DevPage };
