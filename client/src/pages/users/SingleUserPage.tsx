import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import SingleUserPageComponent from "../../components/UserPage/SingleUserPageComponent";
import { useParams } from "react-router-dom";

const SingleUserPage = () => {
  const { id } = useParams();

  return (
    <PageTemplate>
      <Container isSmall>
        <SingleUserPageComponent id={id || ""} />
      </Container>
    </PageTemplate>
  );
};

export default SingleUserPage;
