import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import GroupPageComponent from "../../components/GroupPage/GroupPageComponent";

const GroupsPage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <GroupPageComponent />
      </Container>
    </PageTemplate>
  );
};

export default GroupsPage;
