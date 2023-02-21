import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UserResultObject } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  signUp(@Body() userData: CreateUserDto): Promise<UserResultObject> {
    return this.userService.createUser(userData);
  }

  @Post('login')
  login(@Body() userData: LoginUserDto): Promise<UserResultObject> {
    return this.userService.loginUser(userData);
  }
}
