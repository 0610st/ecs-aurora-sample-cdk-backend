import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UserResultObject } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiCreatedResponse()
  signUp(@Body() userData: CreateUserDto): Promise<UserResultObject> {
    return this.userService.createUser(userData);
  }

  @Post('login')
  @ApiCreatedResponse()
  login(@Body() userData: LoginUserDto): Promise<UserResultObject> {
    return this.userService.loginUser(userData);
  }
}
