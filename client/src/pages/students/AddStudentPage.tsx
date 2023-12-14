import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import SingleStudentPageComponent from "../../components/StudentsPage/SingleStudentPageComponent";

const AddStudentPage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <SingleStudentPageComponent />
      </Container>
    </PageTemplate>
  );
};

export default AddStudentPage;
