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
        tasks: true,
      },
    });

    return user as any;
  }

  async findAll(): Promise<UserOutputDto[]> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        tasks: true,
      },
    }) as any;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }

  async find(id: string): Promise<UserOutputDto> {
    return this.prismaService.user.findFirstOrThrow({
      where: { id },
      include: { tasks: true },
    }) as any;
  }
}
