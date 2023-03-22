import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { PrismaFilter } from 'src/errors/prisma/prisma.filter';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Controller('areas')
@UseFilters(PrismaFilter)
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  @Get(':areaId')
  findOne(@Param('areaId') areaId: string) {
    return this.areasService.findOne(areaId);
  }

  @Patch(':areaId')
  update(
    @Param('areaId') areaId: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(areaId, updateAreaDto);
  }

  @HttpCode(204)
  @Delete(':areaId')
  async remove(@Param('areaId') id: string): Promise<void> {
    await this.areasService.remove(id);
  }
}
