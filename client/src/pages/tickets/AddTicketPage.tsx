import React from "react";
import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import TicketForm from "../../components/TicketsPage/TicketForm";

const AddTicketPage = () => {
  return (
    <PageTemplate>
      <Container>
        <TicketForm />
      </Container>
    </PageTemplate>
  );
};

export default AddTicketPage;
