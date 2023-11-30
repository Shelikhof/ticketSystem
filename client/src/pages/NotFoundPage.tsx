import React from "react";
import Container from "../components/Container/Container";
import PageTemplate from "./PageTemplate";

const NotFoundPage = () => {
  return (
    <PageTemplate>
      <Container isSmall>404</Container>
    </PageTemplate>
  );
};

export default NotFoundPage;
