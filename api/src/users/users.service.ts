import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/password-hashing.utils';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      },
    });
    if (user) {
      throw new ConflictException('Credentials are already in use');
    }

    const { password, ...userCredentials } = createUserDto;
    const hashedPassword = await hashPassword(password);

    return await this.prismaService.user.create({
      data: {
        password: hashedPassword,
        ...userCredentials,
      },
    });
  }

  //find user by email

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'There is no user with the provided credentials',
      );
    }

    return user;
  }

  //list user by id
  async findUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('There is no user with the provided ID');
    }

    return user;
  }

  //list all
  async findAllUser(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  //update
  async updateMe(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        email: updateUserDto.email,
        username: updateUserDto.username,
        password: updateUserDto.password,
        profile_picture_url: updateUserDto.profile_picture_url,
      },
    });
  }

  //delete
  async deleteMe(userId: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
