import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import AppResponse from 'src/common/models/AppResponse';

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);
  constructor(
    @Inject('DATABASE_POOL') private conn: any,
    private readonly authService: AuthService,
  ) {}
  async login(oauthId: string): Promise<AppResponse<any> | HttpException> {
    // QUERY
    const queryData = await this.conn.query(
      `
      SELECT users.sip_id,
        users.id,
        ast_sip_buddies.name,
        ast_sip_buddies.subscribecontext,
        extens.exten
      FROM users
      INNER JOIN ast_sip_buddies on ast_sip_buddies.id = users.sip_id
      INNER JOIN extens on extens.id = users.exten_id
      WHERE users.oauth_id = $1
    `,
      [oauthId],
    );

    const { sip_id, id, name, subscribecontext, exten } = queryData.rows[0];

    // UPDATE
    try {
      await this.conn.query('BEGIN');
      await this.conn.query(
        `
        UPDATE ast_queue_members
        SET "paused" = $1,
          "state_interface" = $2
        WHERE
          "inf_user_id" = $3
          `,
        [0, `SIP/${name}`, id],
      );
      await this.conn.query(
        `
        UPDATE ast_sip_buddies
        SET "callerid" = $1,
          "context" = $2
        WHERE
          "id" = $3
      `,
        [exten, subscribecontext, sip_id],
      );
      await this.conn.query('COMMIT');

      return AppResponse.ok({});
    } catch (e) {
      this.logger.error('TRANSACTION ERROR: ', e);

      await this.conn.query('ROLLBACK');
      return AppResponse.internalServerError([e.message]);
    }
  }

  async logout(oauthId: string): Promise<AppResponse<any> | HttpException> {
    // QUERY
    const users = await this.conn.query(
      `
      SELECT "exten_id", "sip_id", "id"
      FROM users WHERE oauth_id = $1
    `,
      [oauthId],
    );

    // UPDATE
    try {
      await this.conn.query('BEGIN');
      await this.conn.query(
        `
        UPDATE ast_queue_members 
        SET "paused" = $1, 
          "state_interface" = $2
        WHERE
          "inf_user_id" = $3
      `,
        [2, '', users.rows[0].id],
      );
      await this.conn.query(
        `
        UPDATE ast_sip_buddies
        SET "callerid" = $1, 
          "context" = $2
        WHERE
          "id" = $3
      `,
        [null, 'logout', users.rows[0].sip_id],
      );
      await this.conn.query('COMMIT');

      return AppResponse.ok({});
    } catch (e) {
      await this.conn.query('ROLLBACK');
      return AppResponse.internalServerError([e.message]);
    }
  }
}
