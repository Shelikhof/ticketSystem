import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import { useParams } from "react-router-dom";
import SingleGroupPageComponent from "../../components/GroupPage/SingleGroupPageComponent";

const SingleGroupPage = () => {
  const { id } = useParams();

  return (
    <PageTemplate>
      <Container isSmall>
        <SingleGroupPageComponent id={id || ""} />
      </Container>
    </PageTemplate>
  );
};

export default SingleGroupPage;
