import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'generated/prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiConflictResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //find user by email
  /*
  @Get()
  async findUserByEmail(@Query('email') email: string): Promise<User> {
    return await this.usersService.findUserByEmail(email);
  }*/

  //find user by id
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findUserById(id);
  }

  //list all
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllUser(): Promise<User[]> {
    return await this.usersService.findAllUser();
  }

  //update
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @ApiOkResponse({
    description: 'User details updated successfully',
  })
  @ApiConflictResponse({
    description: 'User details went wrong',
  })
  async updateMe(
    @CurrentUser() user: { userId: string },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    await this.usersService.updateMe(user.userId, updateUserDto);

    return {
      message: 'User updated successfully',
    };
  }

  //delete
  @UseGuards(JwtAuthGuard)
  @Delete()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'User deleted successfully',
  })
  @ApiConflictResponse({
    description: 'User cannot be deleted',
  })
  async deleteMe(
    @CurrentUser() user: { userId: string },
  ): Promise<{ message: string }> {
    await this.usersService.deleteMe(user.userId);

    return {
      message: 'User deleted successfully',
    };
  }
}
