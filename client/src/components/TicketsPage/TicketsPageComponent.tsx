import React, { useEffect, useState } from "react";
import Accordion from "../../UI/Accordion";
import { ITicketItem } from "../../http/interfaces/ITicketResponse.interface";
import TicketService from "../../http/TicketService";
import InfinityScroll from "../../UI/list/InfinityScroll";
import TicketItem from "../../UI/list/TicketItem";
import styles from "./TicketsPageComponent.module.css";
import { useAppSelector } from "../../store/hook";

const TicketsPageComponent = () => {
  const LIMIT = 10;
  const { id, role } = useAppSelector((state) => state.auth);

  const [pendingTickets, setPendingTickets] = useState<ITicketItem[]>();
  const [pendingPage, setPendingPage] = useState(1);
  const [isPendingOver, setIsPendingOver] = useState(false);

  const [completedTickets, setCompletedTickets] = useState<ITicketItem[]>();
  const [completedPage, setCompletedPage] = useState(1);
  const [isCompletedOver, setIsCompletedOver] = useState(false);

  const [finishedTickets, setFinishedTickets] = useState<ITicketItem[]>();
  const [finishedPage, setFinishedPage] = useState(1);
  const [isFinishedOver, setIsFinishedOver] = useState(false);

  const fetchPendingTickets = async () => {
    const data = await TicketService.getTickets("pending", LIMIT, pendingPage, id, role);
    if (data.data.count <= data.data.limit * data.data.page) {
      setIsPendingOver(true);
    }
    setPendingTickets([...(pendingTickets || []), ...data.data.tickets]);
    setPendingPage((prev) => prev + 1);
  };

  const fetchCompleteTickets = async () => {
    const data = await TicketService.getTickets("completed", LIMIT, completedPage, id, role);
    if (data.data.count <= data.data.limit * data.data.page) {
      setIsCompletedOver(true);
    }
    setCompletedTickets([...(completedTickets || []), ...data.data.tickets]);
    setCompletedPage((prev) => prev + 1);
  };

  const fetchFinishedTickets = async () => {
    const data = await TicketService.getTickets("finished", LIMIT, finishedPage, id, role);
    if (data.data.count <= data.data.limit * data.data.page) {
      setIsFinishedOver(true);
    }
    setFinishedTickets([...(finishedTickets || []), ...data.data.tickets]);
    setFinishedPage((prev) => prev + 1);
  };

  const onDelete = async (id: string) => {
    await TicketService.deteleTicket(id);
    if (pendingTickets) {
      setPendingTickets(pendingTickets.filter((el) => el.id !== id));
    }
  };

  return (
    <div className={styles["tickets-wrapper"]}>
      {role !== "Менеджер" && (
        <Accordion label="На руках" defaultOpen={true}>
          <InfinityScroll fetchData={fetchCompleteTickets} isOver={isCompletedOver}>
            <div className={styles["ticket-list"]}>
              {completedTickets &&
                completedTickets.length > 0 &&
                completedTickets.map((el) => <TicketItem key={el.id} certificateTitle={el.certificate?.title} link={`/tickets/${el.id}`} ticketStatus="completed" title={el.title} />)}
            </div>
          </InfinityScroll>
        </Accordion>
      )}
      <Accordion label="В обработке" defaultOpen={true}>
        <InfinityScroll fetchData={fetchPendingTickets} isOver={isPendingOver}>
          <div className={styles["ticket-list"]}>
            {pendingTickets &&
              pendingTickets.length > 0 &&
              pendingTickets.map((el) => (
                <TicketItem onDelete={() => onDelete(el.id)} key={el.id} certificateTitle={el.certificate?.title} link={`/tickets/${el.id}`} ticketStatus="pending" title={el.title} />
              ))}
          </div>
        </InfinityScroll>
      </Accordion>
      {role !== "Менеджер" && (
        <Accordion label="Выполненные">
          <InfinityScroll fetchData={fetchFinishedTickets} isOver={isFinishedOver}>
            <div className={styles["ticket-list"]}>
              {finishedTickets &&
                finishedTickets.length > 0 &&
                finishedTickets.map((el) => <TicketItem key={el.id} certificateTitle={el.certificate?.title} link={`/tickets/${el.id}`} ticketStatus="finished" title={el.title} />)}
            </div>
          </InfinityScroll>
        </Accordion>
      )}
    </div>
  );
};

export default TicketsPageComponent;
