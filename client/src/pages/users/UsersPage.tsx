import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import UsersPageComponent from "../../components/UserPage/UsersPageComponent";

const UsersPage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <UsersPageComponent />
      </Container>
    </PageTemplate>
  );
};

export default UsersPage;
