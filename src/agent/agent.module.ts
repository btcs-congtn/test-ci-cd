import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentControllerV1 } from './agent.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AgentControllerV1],
  providers: [AgentService],
})
export class AgentModule {}
