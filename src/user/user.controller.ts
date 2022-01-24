import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dtos/index.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import AppResponse from 'src/common/models/AppResponse';
import Collection from 'src/common/models/Collection';

@ApiTags('users')
@ApiBearerAuth()
@Controller({
  path: 'users',
  version: '1',
})
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() userData: CreateUserDto,
  ): Promise<AppResponse<UserModel>> {
    const user = await this.userService.create(userData);

    return AppResponse.ok(user);
  }

  @Get()
  async findAll(): Promise<AppResponse<Collection<UserModel>>> {
    const collection = await this.userService.findAll();

    return AppResponse.ok(collection);
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AppResponse<UserModel>> {
    const user = await this.userService.findOne({ id });

    return AppResponse.ok(user);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<AppResponse<UserModel>> {
    const user = await this.userService.update({
      where: { id: Number(id) },
      data: { ...updateUserData },
    });

    return AppResponse.ok(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<AppResponse<undefined>> {
    await this.userService.delete({ id: Number(id) });

    return AppResponse.ok();
  }
}
