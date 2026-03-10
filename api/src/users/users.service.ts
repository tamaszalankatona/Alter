import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/password-hashing.utils';

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
}
