import React, { useEffect, useState } from "react";
import { ISingleTicket } from "../../http/interfaces/ITicketResponse.interface";
import TicketService from "../../http/TicketService";
import { Link, useNavigate } from "react-router-dom";
import ContentContainer from "../Container/ContentContainer";
import ListItemSkeleton from "../../UI/skeletons/ListItemSkeleton";
import Label from "../../UI/Label";
import styles from "./SingleTicketPageComponent.module.css";
import SwitchButton from "../../UI/forms/SwitchButton";
import { Button } from "../../UI";
import { useAppSelector } from "../../store/hook";

interface IProp {
  id: string;
}

const SingleTicketPageComponent: React.FC<IProp> = ({ id }) => {
  const [ticketData, setTicketData] = useState<ISingleTicket>();
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.auth);

  const fetchTicketData = async () => {
    try {
      const data = await TicketService.getSingleTicket(id);
      setTicketData(data.data);
    } catch (error) {
      navigate("/404");
    }
  };

  useEffect(() => {
    fetchTicketData();
  }, []);

  const handleChangeTicketStatus = async (id: string, status: string) => {
    await TicketService.changeTicketStatus(id, status);
    navigate("/tickets");
  };

  const handleChangeGettingStatus = async (status: boolean, id: string) => {
    await TicketService.changeGettingStatus(ticketData!.id, id, status);
    return;
  };

  if (id && !ticketData) {
    return (
      <ContentContainer>
        <div>
          <ListItemSkeleton />
        </div>
        <div>
          <ListItemSkeleton />
          <ListItemSkeleton />
        </div>
      </ContentContainer>
    );
  }

  return (
    <div className={styles["container"]}>
      <h3>{ticketData?.title}</h3>
      <div className={styles["top-info"]}>
        <Label label="Группа" value={ticketData!.group.name} />
        <Label label="Тип справки" value={ticketData!.certificate.title} />
      </div>
      <div className={styles["students-list"]}>
        <div className={styles["list-header"]}>
          <h4>Добавленные студенты</h4>
          {ticketData!.status !== "pending" && <h4>Получена</h4>}
        </div>
        <div>
          {ticketData?.students.map((el) => (
            <div className={styles["student-item"]} key={el.id}>
              <Link to={`/students/${el.id}`}>
                <p>{el.fullName}</p>
              </Link>
              {ticketData.status !== "pending" && <SwitchButton isChecked={el.isGet} onChange={handleChangeGettingStatus} isDisabled={ticketData!.status === "finished" ? true : false} id={el.id} />}
            </div>
          ))}
        </div>
      </div>
      <div className={styles["buttons"]}>
        <Button btnStyle="gray" onClick={() => navigate("/tickets")}>
          Отмена
        </Button>
        {role === "Менеджер" && ticketData?.status === "pending" && <Button>Выгрузить заявку</Button>}
        {role === "Менеджер" && ticketData?.status === "pending" && <Button onClick={() => handleChangeTicketStatus(ticketData!.id, "completed")}>Выполнить заявку</Button>}
        {role === "Преподаватель" && ticketData?.status === "completed" && <Button onClick={() => handleChangeTicketStatus(ticketData!.id, "finished")}>Закрыть заявку</Button>}
      </div>
    </div>
  );
};

export default SingleTicketPageComponent;
