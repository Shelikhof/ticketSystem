import React from "react";
import Container from "../components/Container/Container";
import PageTemplate from "./PageTemplate";
import NotFound from "../components/NotFoundPage/NotFound";

const NotFoundPage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <NotFound />
      </Container>
    </PageTemplate>
  );
};

export default NotFoundPage;
