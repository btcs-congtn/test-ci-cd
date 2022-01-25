import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserControllerV1 } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserControllerV1],
  providers: [UserService],
})
export class UserModule {}
