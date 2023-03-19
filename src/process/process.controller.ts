import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { PrismaFilter } from 'src/errors/prisma/prisma.filter';
import {
  ProcessCreateDto,
  ProcessOutputDto,
} from './dto/process.dto/process.dto';
import { ProcessService } from './process.service';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  async create(@Body() data: ProcessCreateDto): Promise<any> {
    return await this.processService.create(data);
  }

  @Get()
  async find(): Promise<Array<any>> {
    return this.processService.findAll();
  }

  @UseFilters(PrismaFilter)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProcessOutputDto> {
    return await this.processService.getProcess(id);
  }

  @UseFilters(PrismaFilter)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.processService.delete(id);
  }
}
