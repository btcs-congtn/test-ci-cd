import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { status: string; data: string } {
    return { status: 'available', data: `chao ban nhe ${process.env.DB} 5` };
  }

  getHealth(): { status: string } {
    return { status: 'available' };
  }
}
