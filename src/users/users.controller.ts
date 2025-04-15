import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { getUserByEmailDto } from './dtos/get-user-by-email.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { GetUserByIdDto } from './dtos/user-user-by-id.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { AuthInterceptor, Role, User } from '@app/common';
import { USER_ROLES } from '@app/common/constants';
import { GetAllUsersQueryDto } from './dtos/get-all-users.dto';
import { UpdateUserByIdDto } from './dtos/update-user-by-id.dto';
import { SendMailDto } from './dtos/send-mail.dto';
import { GetAccountTypeByEmailDto } from './dtos/get-account-type.dto';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('email')
  @UseInterceptors(new AuthInterceptor())
  @Role([USER_ROLES.ADMIN])
  @HttpCode(HttpStatus.OK)
  async getUserByEmail(@Query() { email }: getUserByEmailDto) {
    const user = await this.usersService.getUserByEmail(email);

    return { message: 'User fetched successfully', user };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getMe(@CurrentUser() user: User) {
    return { message: 'User fetched successfully', user };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor())
  @Role([USER_ROLES.ADMIN])
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() payload: GetAllUsersQueryDto) {
    const { users, count } = await this.usersService.getAllUsers(payload);

    return { message: 'Users fetched successfully', users, count };
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor())
  @HttpCode(HttpStatus.OK)
  async updateMyProfile(
    @Body() payload: UpdateUserByIdDto,
    @CurrentUser() user: User,
  ) {
    const updatedUser = await this.usersService.updateUserById(
      String(user._id),
      payload,
    );

    return { message: 'User updated successfully', user: updatedUser };
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor())
  @HttpCode(HttpStatus.OK)
  async deleteMyProfile(@CurrentUser() user: User) {
    const deletedUser = await this.usersService.deleteUserById(
      String(user._id),
    );

    return { message: 'User deleted successfully', user: deletedUser };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor())
  @Role([USER_ROLES.ADMIN])
  @HttpCode(HttpStatus.OK)
  async updateUserById(
    @Param() { id }: GetUserByIdDto,
    @Body() user: UpdateUserByIdDto,
  ) {
    const updatedUser = await this.usersService.updateUserById(id, user);

    return { message: 'User updated successfully', user: updatedUser };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor())
  @Role([USER_ROLES.ADMIN])
  @HttpCode(HttpStatus.OK)
  async deleteUserById(@Param() { id }: GetUserByIdDto) {
    const deletedUser = await this.usersService.deleteUserById(id);

    return { message: 'User deleted successfully', user: deletedUser };
  }

  @Post('send-mail')
  @HttpCode(HttpStatus.OK)
  async sendMail(@Body() { to, subject, html, cc }: SendMailDto) {
    await this.usersService.sendMail({ to, subject, html, cc });
  }

  @Get('account-type')
  @HttpCode(HttpStatus.OK)
  async getAccountType(@Query() { email }: GetAccountTypeByEmailDto) {
    const accountType = await this.usersService.getAccountTypeByEmail({
      email,
    });

    return {
      message: 'Account type fetched successfully',
      accountType,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor())
  @Role([USER_ROLES.ADMIN])
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param() { id }: GetUserByIdDto) {
    const user = await this.usersService.getUserById(id);

    return { message: 'User fetched successfully', user };
  }
}
