import { Controller, HttpException, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import AppResponse from 'src/common/models/AppResponse';
import { CustomRequest } from 'src/common/models/CustomRequest';
import { AgentService } from './agent.service';

@ApiTags('agents')
@ApiBearerAuth()
@Controller({
  path: 'agents',
  version: '1',
})
export class AgentControllerV1 {
  constructor(private readonly agentService: AgentService) {}

  @Post('login')
  async login(
    @Req() req: CustomRequest,
  ): Promise<AppResponse<any> | HttpException> {
    if (!req.user || !req.user?.oauth_id) {
      return AppResponse.authenticationFailed(['Unauthorized']);
    }

    const res = await this.agentService.login(req.user.oauth_id as string);

    return res;
  }

  @Post('logout')
  async logout(
    @Req() req: CustomRequest,
  ): Promise<AppResponse<any> | HttpException> {
    if (!req.user || !req.user?.oauth_id) {
      return AppResponse.authenticationFailed(['Unauthorized']);
    }
    const res = await this.agentService.logout(req.user.oauth_id as string);

    return res;
  }
}
