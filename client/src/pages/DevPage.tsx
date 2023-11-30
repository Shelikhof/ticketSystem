import React from "react";
import { Button, Input } from "../UI";
import ListItem from "../UI/ListItem";

const DevPage = () => {
  return (
    <div>
      DevPage
      <hr />
      <Button>Кнопка</Button>
      <hr />
      {/* <Input label="Пароль" /> */}
      <ListItem link="/l" label="ad" />
    </div>
  );
};

export { DevPage };
