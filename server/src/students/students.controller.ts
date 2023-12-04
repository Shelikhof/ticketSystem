import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/createStudent.dto";

@Controller("students")
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  //create students
  @Post("/add")
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  //edit student by id
  @Put("/:studentId")
  edit(@Param("studentId") studentId: string, @Body() dto: CreateStudentDto) {
    return this.studentsService.edit(studentId, dto);
  }

  //delete student by id
  @Delete("/:studentId")
  delete(@Param("studentId") studentId: string) {
    return this.studentsService.delete(studentId);
  }

  //get student by id
  @Get("/:studentId")
  getById(@Param("studentId") studentId: string) {
    return this.studentsService.getById(studentId);
  }

  //get all students
  @Get()
  getAll(@Query() query: any) {
    if (query.page && query.limit && query.q) {
      return this.studentsService.getBySearch(query.page, query.limit, query.q);
    }
    if (query.page && query.limit) {
      return this.studentsService.getAllWithLimit(query.page, query.limit);
    }
    return this.studentsService.getAll();
  }
}
