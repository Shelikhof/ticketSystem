import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import SingleCertificatePageComponent from "../../components/CertificatePage/SingleCertificatePageComponent";
import { useParams } from "react-router-dom";

const SingleCertificatePage = () => {
  const { id } = useParams();

  return (
    <PageTemplate>
      <Container isSmall>
        <SingleCertificatePageComponent id={id || ""} />
      </Container>
    </PageTemplate>
  );
};

export default SingleCertificatePage;
