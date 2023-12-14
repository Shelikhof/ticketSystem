import { Button } from "../UI";
import ListItem from "../UI/list/ListItem";
import Accordion from "../UI/Accordion";
import TicketItem from "../UI/list/TicketItem";

const DevPage = () => {
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
    </div>
  );
};

export { DevPage };
