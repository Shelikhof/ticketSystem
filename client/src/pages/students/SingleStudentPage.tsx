import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import SingleStudentPageComponent from "../../components/StudentsPage/SingleStudentPageComponent";
import { useParams } from "react-router-dom";

const SingleStudentPage = () => {
  const { id } = useParams();

  return (
    <PageTemplate>
      <Container isSmall>
        <SingleStudentPageComponent id={id || ""} />
      </Container>
    </PageTemplate>
  );
};

export default SingleStudentPage;
