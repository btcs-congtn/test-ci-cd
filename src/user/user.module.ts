import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { UserControllerV1 } from './user.controller';

@Module({
  controllers: [UserControllerV1],
  providers: [UserService, PrismaService],
})
export class UserModule {}
