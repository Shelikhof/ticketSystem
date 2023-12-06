import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hook";
import { IStudentItem } from "../../http/interfaces/IStudentsResponse.interface";
import StudentService from "../../http/StudentsService";
import GroupService from "../../http/GroupService";
import { ISingleGroup } from "../../http/interfaces/IGroupResponse.interface";
import { ICertificateItem } from "../../http/interfaces/ICertificatesRespones.interface";
import CertificateService from "../../http/CertificateService";
import Select from "../../UI/forms/Select";
import Accordion from "../../UI/Accordion";
import AddStudentList from "../../UI/list/AddStudentList";

const TicketForm = () => {
  const { id } = useAppSelector((state) => state.auth);
  const [groupData, setGroupData] = useState<ISingleGroup>();
  const [certificatesData, setCertificatesData] = useState<ICertificateItem[]>();

  const fetchGroupData = async () => {
    const data = await GroupService.getGroupByCuratorId(id);
    setGroupData(data.data);
  };

  const fetchCertificatesData = async () => {
    const data = await CertificateService.getCertificates();
    setCertificatesData(data.data);
  };

  useEffect(() => {
    if (id) {
      fetchGroupData();
      fetchCertificatesData();
    }
  }, []);

  const hanldeCertificateChange = (id: string) => {
    console.log(id);
  };

  return (
    <div>
      <h2>Создать заявку</h2>
      <div>{certificatesData && <Select data={certificatesData} label="Тип справки" name="certificate" setValue={hanldeCertificateChange} defaultValue={certificatesData[0].id} />}</div>
      <Accordion label="Студенты" styleType="2">
        {groupData && <AddStudentList students={groupData?.students} />}
      </Accordion>
    </div>
  );
};

export default TicketForm;
