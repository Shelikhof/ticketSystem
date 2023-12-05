import React, { useState } from "react";
import { Button, Input } from "../UI";
import ListItem from "../UI/list/ListItem";
import InfinityScroll from "../UI/list/InfinityScroll";
import SearchBar from "../UI/forms/SearchBar";
import Select from "../UI/forms/Select";
import SearchSelect from "../UI/forms/SearchSelect";

const DevPage = () => {
  const [height, setHeight] = useState(100);
  const fetchData = (q: string) => {
    // setHeight(height + 100);
    console.log(q);
  };

  const genders = [
    {
      id: "male",
      title: "male",
    },
    {
      id: "female",
      title: "female",
    },
    {
      id: "male",
      title: "male",
    },
    {
      id: "female",
      title: "female",
    },
    {
      id: "male",
      title: "male",
    },
    {
      id: "female",
      title: "female",
    },
    {
      id: "male",
      title: "male",
    },
    {
      id: "female",
      title: "female",
    },
    {
      id: "male",
      title: "male",
    },
    {
      id: "female",
      title: "female",
    },
    {
      id: "male",
      title: "male",
    },
    {
      id: "female",
      title: "female",
    },
  ];

  const setValue = (id: string) => {
    console.log(id);
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
      {/* <SearchBar onSearch={fetchData} /> */}
      <div style={{ width: "300px" }}>{/* <Select data={genders} setValue={setValue} label="Пол" /> */}</div>
      <SearchSelect />
    </div>
  );
};

export { DevPage };
