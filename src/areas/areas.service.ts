import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreasService {
  constructor(
    private prismaService: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async create(data: CreateAreaDto): Promise<void> {
    const { process, ...rest } = data;
    const payload = process.map((proc) => {
      const { subprocess, tasks, ...rest } = proc;
      return {
        ...rest,
        subprocess: subprocess && {
          create: this.utilsService.formatedPayloadSubprocess(subprocess),
        },
        tasks: { create: this.utilsService.formatedPayloadTask(tasks) },
      };
    });

    await this.prismaService.area.create({
      data: {
        ...rest,
        processes: {
          create: payload,
        },
      },
    });
    return;
  }

  async findAll(): Promise<CreateAreaDto> {
    return (await this.prismaService.area.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            processes: true,
          },
        },
      },
    })) as any;
  }

  async findOne(areaId: string) {
    return await this.prismaService.area.findUniqueOrThrow({
      where: { id: areaId },
      select: {
        id: true,
        name: true,
        description: true,
        processes: {
          select: {
            id: true,
            title: true,
            subtitle: true,
            description: true,
            tasks: {
              select: {
                id: true,
                name: true,
                summary: true,
                tag: true,
                documentation: true,
                done: true,
                createdAt: true,
                expiresIn: true,
                users: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarUrl: true,
                  },
                },
              },
            },
            subprocess: {
              select: {
                id: true,
                name: true,
                description: true,
                tasks: {
                  select: {
                    id: true,
                    name: true,
                    summary: true,
                    tag: true,
                    documentation: true,
                    done: true,
                    createdAt: true,
                    expiresIn: true,
                    users: {
                      select: {
                        id: true,
                        name: true,
                        email: true,
                        avatarUrl: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  update(id: string, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  async remove(areaId: string): Promise<void> {
    await this.prismaService.area.delete({ where: { id: areaId } });
  }
}
