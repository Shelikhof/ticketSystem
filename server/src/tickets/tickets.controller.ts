import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query, Res } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/createTicket.dto";
import { ChangeStatusTicket } from "./dto/changeStatus.dto";
import { ChangeGettingStatus } from "./dto/changeGettingStatus.dto";
import { Response } from "express";
import * as fs from "fs";

@Controller("tickets")
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketService.create(dto);
  }

  @Get("/:ticketId")
  getById(@Param("ticketId") ticketId: string) {
    return this.ticketService.getById(ticketId);
  }

  @Get()
  getAll(@Query() query: any) {
    if (query.limit && query.page && query.status && query.userId && query.role) {
      return this.ticketService.getAllWithLimitAndStatus(query.status, query.limit, query.page, query.userId, query.role);
    }
    if (query.limit && query.page) {
      return this.ticketService.getAllWithLimit(query.limit, query.page);
    }
    return this.ticketService.getAll();
  }

  @Put("/:ticketId/status")
  changeStatus(@Param("ticketId") ticketId: string, @Body() dto: ChangeStatusTicket) {
    return this.ticketService.changeStatus(ticketId, dto);
  }

  @Put("/:ticketId/studentStatus/:studentId")
  changeStudentStatus(@Param("ticketId") ticketId: string, @Param("studentId") studentId: string, @Body() dto: ChangeGettingStatus) {
    return this.ticketService.changeGettingStatus(ticketId, studentId, dto);
  }

  @Delete(":ticketId")
  delete(@Param("ticketId") ticketId: string) {
    return this.ticketService.delete(ticketId);
  }
  @Get("/:ticketId/report")
  @Header("Content-Type", "text/xlsx")
  async getReport(@Param("ticketId") ticketId: string, @Res() res: Response) {
    let result = await this.ticketService.getReportById(ticketId);
    // res.download(`${result}`);
    return res.set("Content-Disposition", `attachment; filename=example.xlsx`).send(result);
  }
}
