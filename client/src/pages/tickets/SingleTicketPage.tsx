import React from "react";
import Container from "../../components/Container/Container";
import PageTemplate from "../PageTemplate";
import SingleTicketPageComponent from "../../components/TicketsPage/SingleTicketPageComponent";
import { useParams } from "react-router-dom";

const SingleTicketPage = () => {
  const { id } = useParams();

  return (
    <PageTemplate>
      <Container isSmall>
        <SingleTicketPageComponent id={id || ""} />
      </Container>
    </PageTemplate>
  );
};

export default SingleTicketPage;
