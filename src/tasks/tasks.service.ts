import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { TaskCreateDto, TaskOutputDto } from './dto/tasks.dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    private prismaService: PrismaService,
    private utilsService: UtilsService,
  ) {}

  async create(processId: string, data: TaskCreateDto[]): Promise<void> {
    const payloadTasks = this.utilsService.formatedPayloadTask(data);
    // await this.prismaService.process.update({
    //   where: { id: processId },
    //   data: {
    //     tasks: {
    //       create: payloadTasks,
    //     },
    //   },
    // });

    console.log(payloadTasks);
    for await (const task of payloadTasks) {
      await this.prismaService.task.create({
        data: task,
      });
    }
    return;
  }

  async findAll(): Promise<TaskOutputDto[]> {
    return await this.prismaService.task.findMany({
      select: {
        id: true,
        name: true,
        summary: true,
        tag: true,
        done: true,
        createdAt: true,
        expiresIn: true,
        process: true,
        subprocess: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async findById(taksId: string): Promise<TaskOutputDto> {
    return await this.prismaService.task.findUniqueOrThrow({
      where: { id: taksId },
      select: {
        id: true,
        name: true,
        summary: true,
        tag: true,
        documentation: true,
        createdAt: true,
        expiresIn: true,
        done: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        process: {
          select: {
            id: true,
            title: true,
            subtitle: true,
            description: true,
          },
        },
        subprocess: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
  }

  async delete(taksId: string): Promise<void> {
    await this.prismaService.task.delete({
      where: { id: taksId },
    });
  }
}
