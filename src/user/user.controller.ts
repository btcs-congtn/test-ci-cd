import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import AppResponse from 'src/common/models/AppResponse';
import Collection from 'src/common/models/Collection';
import User from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller({
  path: 'users',
  version: '1',
})
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<AppResponse<Collection<User>>> {
    const collection = await this.userService.findAll();

    return AppResponse.ok(collection);
  }

  // @Post()
  // async create(
  //   @Body() userData: CreateUserDto,
  // ): Promise<AppResponse<UserModel>> {
  //   const user = await this.userService.create(userData);

  //   return AppResponse.ok(user);
  // }

  // @Get(':id')
  // async findById(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<AppResponse<UserModel>> {
  //   const user = await this.userService.findOne({ id });

  //   return AppResponse.ok(user);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserData: UpdateUserDto,
  // ): Promise<AppResponse<UserModel>> {
  //   const user = await this.userService.update({
  //     where: { id: Number(id) },
  //     data: { ...updateUserData },
  //   });

  //   return AppResponse.ok(user);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string): Promise<AppResponse<undefined>> {
  //   await this.userService.delete({ id: Number(id) });

  //   return AppResponse.ok();
  // }
}
