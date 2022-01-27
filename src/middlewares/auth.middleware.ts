import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CustomRequest } from 'src/common/models/CustomRequest';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('DATABASE_POOL') private conn: any,
    private readonly authService: AuthService,
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const bearerToken =
      authHeader && (authHeader.includes(' ') ? authHeader.split(' ')[1] : '');

    if (!bearerToken) {
      req.user = null;
      next();
      return;
    }

    const { sub } = this.authService.verify(bearerToken);

    if (!sub) {
      req.user = null;
      next();
      return;
    }

    const users = await this.conn.query(
      `
      SELECT *
      FROM users
      WHERE users.oauth_id = $1
      `,
      [sub],
    );

    if (users.rows.length !== 1) {
      req.user = null;
      next();
      return;
    }

    req.user = users.rows[0];
    next();
  }
}
