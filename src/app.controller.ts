import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Record<string, unknown> {
    return this.appService.getHello();
  }

  @Get(['/health', '/healthz', '/healthcheck'])
  getHealth(): Record<string, unknown> {
    return this.appService.getHealth();
  }
}
