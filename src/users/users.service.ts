import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';
import { UserResultObject } from './users.interface';
import { LoginUserDto } from './dto/login-user-dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserResultObject> {
    const { username, email, password } = data;

    const hashPassword = await this.hashPassword(password);
    const userData = {
      username,
      email,
      password: hashPassword,
    };

    const user = await this.prisma.user.create({
      data: userData,
      select: {
        username: true,
        email: true,
      },
    });

    return { user };
  }

  async loginUser(data: LoginUserDto): Promise<UserResultObject> {
    const { email, password } = data;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    const errors = { User: 'email or password wrong.' };

    if (!user) {
      throw new HttpException({ errors }, 401);
    }

    const isMatch = await this.comparePassword(password, user.password);

    if (!isMatch) {
      throw new HttpException({ errors }, 401);
    }

    return {
      user: {
        email: user.email,
        username: user.username,
      },
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  }

  private async comparePassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(hashPassword, plainPassword);
  }
}
