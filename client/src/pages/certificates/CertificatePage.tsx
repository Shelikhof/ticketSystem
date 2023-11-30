import React from "react";
import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import CertificateList from "../../components/CertificatePage/CertificateList";
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
