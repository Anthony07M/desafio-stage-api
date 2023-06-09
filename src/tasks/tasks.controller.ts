import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { PrismaFilter } from 'src/errors/prisma/prisma.filter';
import { TaskCreateDto, TaskOutputDto } from './dto/tasks.dto/tasks.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseFilters(PrismaFilter)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async creates(@Body() data: TaskCreateDto[]): Promise<void> {
    return await this.tasksService.create('processId', data);
  }

  @Post(':processId')
  async create(
    @Param('processId') processId: string,
    @Body() data: TaskCreateDto[],
  ): Promise<void> {
    return await this.tasksService.create(processId, data);
  }

  @Get()
  async findAll(): Promise<TaskOutputDto[]> {
    return await this.tasksService.findAll();
  }

  @Delete(':taskId')
  async delete(@Param('taskId') taskId: string): Promise<void> {
    await this.tasksService.delete(taskId);
  }

  @Get(':taskId')
  async findById(@Param('taskId') taskId: string): Promise<TaskOutputDto> {
    return await this.tasksService.findById(taskId);
  }
}
