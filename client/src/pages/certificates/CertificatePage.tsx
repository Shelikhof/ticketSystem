import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import CertificatePageComponent from "../../components/CertificatePage/CertificatePageComponent";

const CertificatePage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <CertificatePageComponent />
      </Container>
    </PageTemplate>
  );
};

export default CertificatePage;
