import React, { useEffect, useState } from "react";
import styles from "./CertificatePageComponent.module.css";
import { ICertificateItem } from "../../http/interfaces/ICertificatesRespones.interface";
import CertificateService from "../../http/CertificateService";
import ContentContainer from "../Container/ContentContainer";
import { Button } from "../../UI";
import CertificateList from "./CertificateList";
import { useNavigate } from "react-router-dom";

const CertificatePageComponent = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<ICertificateItem[] | void>();

  const fetchData = async () => {
    const data = await CertificateService.getCertificates();
    setCertificates(data.data);
    console.log(certificates);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentContainer>
      <div className={styles["header"]}>
        <h2>Справки</h2>
        <Button onClick={() => navigate("add")}>Добавить справку</Button>
      </div>
      <CertificateList certificates={certificates} />
    </ContentContainer>
  );
};

export default CertificatePageComponent;
