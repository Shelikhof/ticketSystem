import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import StudentsPageComponent from "../../components/StudentsPage/StudentsPageComponent";

const StudentsPage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <StudentsPageComponent />
      </Container>
    </PageTemplate>
  );
};

export default StudentsPage;
