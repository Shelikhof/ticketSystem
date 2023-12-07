import React from "react";
import { Route, Routes } from "react-router-dom";
import TicketsPage from "../pages/tickets/TicketsPage";
import AddTicketPage from "../pages/tickets/AddTicketPage";
import SingleTicketPage from "../pages/tickets/SingleTicketPage";

const TicketRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TicketsPage />} />
      <Route path="/:id" element={<SingleTicketPage />} />
      <Route path="/add" element={<AddTicketPage />} />
    </Routes>
  );
};

export default TicketRouter;
