import React, { useState } from "react";
import { Button, Input } from "../UI";
import ListItem from "../UI/list/ListItem";
import InfinityScroll from "../UI/list/InfinityScroll";
import SearchBar from "../UI/forms/SearchBar";
import Select from "../UI/forms/Select";
import SearchSelect from "../UI/forms/SearchSelect";
import Accordion from "../UI/Accordion";
import TicketItem from "../UI/list/TicketItem";
import AddStudentList from "../UI/list/AddStudentList";
import SwitchButton from "../UI/forms/SwitchButton";

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

  const students = [
    {
      fullName: "asd asd1",
      id: "1",
    },
    {
      fullName: "asd asd2",
      id: "2",
    },
    {
      fullName: "asd asd3",
      id: "3",
    },
  ];

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
      {/* <SearchSelect /> */}
      <Accordion label="Test" styleType="1">
        <p>Test1</p>
        <p>Test2</p>
        <p>Test3</p>
        <p>Test4</p>
      </Accordion>
      <TicketItem certificateTitle="aaa" link="/" ticketStatus="pending" title="Заявка 12 12" />
      <AddStudentList students={students} />
      <SwitchButton />
    </div>
  );
};

export { DevPage };
