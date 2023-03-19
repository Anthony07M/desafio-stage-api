import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ProcessCreateDto,
  ProcessOutputDto,
} from './dto/process.dto/process.dto';

@Injectable()
export class ProcessService {
  constructor(private prismaService: PrismaService) {}

  async create(data: ProcessCreateDto): Promise<any> {
    const { tasks, subprocess, ...rest } = data;

    const process = await this.prismaService.process.create({ data: rest });

    const payloadTask = tasks.map((task) => {
      const { users, ...rest } = task;
      const connect = users.map((userId) => userId);

      return { ...rest, users: { connect } };
    });

    for await (const task of payloadTask) {
      await this.prismaService.task.create({
        data: {
          ...task,
          processId: process.id,
        },
        include: {
          users: true,
        },
      });
    }

    return process;
  }

  async findAll(): Promise<Array<ProcessOutputDto>> {
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
        subprocess: true,
      },
    });
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
        subprocess: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.process.delete({
      where: { id },
      include: {
        subprocess: true,
        tasks: true,
      },
    });
  }
}
