import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import TicketsPageComponent from "../../components/TicketsPage/TicketsPageComponent";

const TicketsPage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <TicketsPageComponent />
      </Container>
    </PageTemplate>
  );
};

export default TicketsPage;
