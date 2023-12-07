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
import styles from "./TicketForm.module.css";
import ItemsList from "../../UI/list/ItemsList";
import { Button } from "../../UI";
import { useNavigate } from "react-router-dom";
import TicketService from "../../http/TicketService";

const TicketForm = () => {
  const { id } = useAppSelector((state) => state.auth);

  const [groupData, setGroupData] = useState<ISingleGroup>();
  const [certificatesData, setCertificatesData] = useState<ICertificateItem[]>();
  const [selectedStudents, setSelectedStudents] = useState<IStudentItem[]>([]);
  const [selectCertificate, setSelectCertificate] = useState<ICertificateItem>();
  const navigate = useNavigate();

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
  }, [id]);

  const hanldeCertificateChange = (id: string) => {
    const cert = certificatesData?.find((el) => el.id === id);
    setSelectCertificate(cert);
  };

  const handleDeleteStudent = (id: string) => {
    setSelectedStudents(selectedStudents.filter((el) => el.id !== id));
  };

  const handleClickAccordion = (item: IStudentItem) => {
    if (selectedStudents.includes(item)) {
      handleDeleteStudent(item.id);
    } else {
      setSelectedStudents([...selectedStudents, item]);
    }
  };

  const handleSubmit = async () => {
    const data = {
      platformId: groupData!.platform.id,
      groupId: groupData!.id,
      curatorId: groupData!.curator.id,
      certificateId: selectCertificate!.id,
      students: selectedStudents.map((el) => el.id),
    };
    await TicketService.createTicket(data);
    navigate("/tickets");
  };

  return (
    <div className={styles["ticket-form"]}>
      <h2>Создать заявку</h2>
      <div>{certificatesData && <Select haveBorder data={certificatesData} label="Тип справки" name="certificate" setValue={hanldeCertificateChange} />}</div>
      <Accordion label="Студенты" styleType="2">
        {groupData && <AddStudentList students={groupData?.students} addedStudents={selectedStudents} handleClick={handleClickAccordion} />}
      </Accordion>
      {groupData && <ItemsList data={selectedStudents} hanldeDelete={handleDeleteStudent} />}
      <div className={styles["buttons"]}>
        <Button btnStyle="gray" onClick={() => navigate("/tickets")}>
          Отмена
        </Button>
        <Button onClick={() => handleSubmit()}>Создать заявку</Button>
      </div>
    </div>
  );
};

export default TicketForm;
