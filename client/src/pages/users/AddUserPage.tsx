import Container from "../../components/Container/Container";
import PageTemplate from "../PageTemplate";
import SingleUserPageComponent from "../../components/UserPage/SingleUserPageComponent";

const AddUserPage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <SingleUserPageComponent />
      </Container>
    </PageTemplate>
  );
};

export default AddUserPage;
