import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import SingleGroupPageComponent from "../../components/GroupPage/SingleGroupPageComponent";

const AddGroupPage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <SingleGroupPageComponent />
      </Container>
    </PageTemplate>
  );
};

export default AddGroupPage;
