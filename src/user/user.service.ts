import { Inject, Injectable, Logger } from '@nestjs/common';
import AppResponse from 'src/common/models/AppResponse';
import Collection from 'src/common/models/Collection';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@Inject('DATABASE_POOL') private conn: any) {}

  async findAll(): Promise<Collection<User>> {
    try {
      const users = await this.conn.query('SELECT * FROM users');

      const collection: Collection<User> = {
        edges: users.rows,
        pageInfo: {
          limit: 0,
          offset: 0,
          total: users.rows.length,
        },
      };

      return collection;
    } catch (error) {
      this.logger.log(`findAll error: ${error.message}`);
      throw AppResponse.internalServerError([error.message]);
    }
  }

  // async findOne(
  //   userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  // ): Promise<User> {
  //   try {
  //     return await this.prisma.user.findUnique({
  //       where: userWhereUniqueInput,
  //       rejectOnNotFound: true,
  //     });
  //   } catch (error) {
  //     this.logger.log(`findOne error: ${error.message}`);
  //     if (error.name === 'NotFoundError') {
  //       throw AppResponse.notFound([error.message]);
  //     }

  //     throw AppResponse.internalServerError([error.message]);
  //   }
  // }

  // async create(data: Prisma.UserCreateInput): Promise<User> {
  //   try {
  //     return await this.prisma.user.create({
  //       data,
  //     });
  //   } catch (error) {
  //     this.logger.log(`create error: ${error.message}`);

  //     if (error.message?.includes('Unique constraint')) {
  //       throw AppResponse.conflict(['email already exists']);
  //     }

  //     throw AppResponse.internalServerError([error.message]);
  //   }
  // }

  // async update(params: {
  //   where: Prisma.UserWhereUniqueInput;
  //   data: Prisma.UserUpdateInput;
  // }): Promise<User> {
  //   try {
  //     const { where, data } = params;
  //     return await this.prisma.user.update({
  //       data,
  //       where,
  //     });
  //   } catch (error) {
  //     this.logger.log(`update error: ${error.message}`);
  //     if (error.message?.includes('Unique constraint')) {
  //       throw AppResponse.conflict(['email already exists']);
  //     }

  //     throw AppResponse.internalServerError([error.message]);
  //   }
  // }

  // async delete(where: Prisma.UserWhereUniqueInput): Promise<void> {
  //   try {
  //     await this.prisma.user.delete({
  //       where,
  //     });
  //   } catch (error) {
  //     this.logger.log(`delete error: ${error.message}`);
  //     throw AppResponse.internalServerError([error.message]);
  //   }
  // }
}
