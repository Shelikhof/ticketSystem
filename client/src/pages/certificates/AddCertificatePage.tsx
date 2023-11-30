import React from "react";
import PageTemplate from "../PageTemplate";
import Container from "../../components/Container/Container";
import CertificatePageComponent from "../../components/CertificatePage/CertificatePageComponent";
import SingleCertificatePageComponent from "../../components/CertificatePage/SingleCertificatePageComponent";

const AddCertificatePage = () => {
  return (
    <PageTemplate>
      <Container isSmall>
        <SingleCertificatePageComponent />
      </Container>
    </PageTemplate>
  );
};

export default AddCertificatePage;
