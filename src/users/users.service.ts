import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDto, UserOutputDto } from './dto/users.dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(data: UserCreateDto): Promise<UserOutputDto> {
    const user = await this.prismaService.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        password: false,
        Task: true,
      },
    });

    return user;
  }

  async findAll(): Promise<UserOutputDto[]> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        Task: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }

  async find(id: string): Promise<UserOutputDto> {
    return this.prismaService.user.findFirstOrThrow({
      where: { id },
      include: { Task: true },
    });
  }
}
