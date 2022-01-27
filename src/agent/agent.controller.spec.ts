import { Test, TestingModule } from '@nestjs/testing';
import { AgentControllerV1 } from './agent.controller';
import { AgentService } from './agent.service';

describe('AgentController', () => {
  let controller: AgentControllerV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentControllerV1],
      providers: [AgentService],
    }).compile();

    controller = module.get<AgentControllerV1>(AgentControllerV1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
