import React from "react";
import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import TicketsPageComponent from "../../components/TicketsPage/TicketsPageComponent";

const TicketsPage = () => {
  return (
    <PageTemplate>
      <Container>
        <TicketsPageComponent />
      </Container>
    </PageTemplate>
  );
};

export default TicketsPage;
