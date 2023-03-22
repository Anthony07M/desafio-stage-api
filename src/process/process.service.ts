import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import {
  ProcessCreateDto,
  ProcessOutputDto,
} from './dto/process.dto/process.dto';

@Injectable()
export class ProcessService {
  constructor(
    private prismaService: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async create(data: ProcessCreateDto): Promise<void> {
    const { subprocess, tasks, ...rest } = data;

    const payloadTask = this.utilsService.formatedPayloadTask(tasks);
    const payloadSubprocess =
      this.utilsService.formatedPayloadSubprocess(subprocess);

    await this.prismaService.process.create({
      data: {
        ...rest,
        tasks: {
          create: payloadTask,
        },
        subprocess: {
          create: payloadSubprocess as any,
        },
      },
    });
    return;
  }

  async findAll(): Promise<ProcessOutputDto[]> {
    return this.prismaService.process.findMany({
      include: {
        tasks: {
          select: {
            id: true,
            name: true,
            summary: true,
            tag: true,
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
    }) as any;
  }

  async getProcess(id: string): Promise<ProcessOutputDto> {
    return this.prismaService.process.findUniqueOrThrow({
      where: { id },
      include: {
        tasks: {
          select: {
            id: true,
            name: true,
            summary: true,
            tag: true,
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
    }) as any;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.process.delete({
      where: { id },
      include: {
        subprocess: true,
        tasks: true,
      },
    });
    return;
  }
}
