import React from "react";
import Accordion from "../../UI/Accordion";

const TicketsPageComponent = () => {
  return (
    <div>
      <Accordion label="На руках" defaultOpen={true}></Accordion>
      <Accordion label="В обработке"></Accordion>
      <Accordion label="Выполненные"></Accordion>
    </div>
  );
};

export default TicketsPageComponent;
