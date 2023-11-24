import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
  @Put("/edit/:studentId")
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
  getAll() {
    return this.studentsService.getAll();
  }
}
