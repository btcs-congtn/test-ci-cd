import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { status: string; data: string } {
    return { status: 'available', data: 'chao ban nhe2' };
  }

  getHealth(): { status: string } {
    return { status: 'available' };
  }
}
