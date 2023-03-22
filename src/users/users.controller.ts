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
import { UserCreateDto, UserOutputDto } from './dto/users.dto/users.dto';
import { UsersService } from './users.service';

@UseFilters(PrismaFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: UserCreateDto): Promise<UserOutputDto> {
    return await this.usersService.create(data);
  }

  @Get()
  async findAll(): Promise<UserOutputDto[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.usersService.delete(id);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<UserOutputDto> {
    return this.usersService.find(id);
  }
}
