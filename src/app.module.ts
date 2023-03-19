import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [PrismaModule, UsersModule, ProcessModule],
  providers: [PrismaService],
})
export class AppModule {}
