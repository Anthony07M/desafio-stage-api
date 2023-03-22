import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProcessModule } from './process/process.module';
import { TasksModule } from './tasks/tasks.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [PrismaModule, UsersModule, ProcessModule, TasksModule, UtilsModule],
  providers: [PrismaService],
})
export class AppModule {}
