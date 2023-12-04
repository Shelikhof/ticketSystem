import React, { useEffect, useState } from "react";
import { ICertificateItem } from "../../http/interfaces/ICertificatesRespones.interface";
import CertificateService from "../../http/CertificateService";
import ContentContainer from "../Container/ContentContainer";
import { useNavigate } from "react-router-dom";
import CertificateForm from "./CertificateForm";
import ListItemSkeleton from "../../UI/skeletons/ListItemSkeleton";

interface IProp {
  id?: string;
}

const SingleCertificatePageComponent: React.FC<IProp> = ({ id }) => {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<ICertificateItem>();

  const fetchData = async (id: string) => {
    try {
      const data = await CertificateService.getSignleCertificates(id);
      setCertificate(data.data);
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);

  return (
    <ContentContainer>
      <div>
        <h2>{id ? certificate?.title : "Добавить справку"}</h2>
      </div>
      <CertificateForm certificate={certificate} />
    </ContentContainer>
  );
};

export default SingleCertificatePageComponent;
