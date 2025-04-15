import {
  convertToObjectIdRecursively,
  MailerService,
  UsersRepository,
} from '@app/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAllUsersQueryDto } from './dtos/get-all-users.dto';
import { UpdateUserByIdDto } from './dtos/update-user-by-id.dto';
import { SendMailDto } from './dtos/send-mail.dto';
import { GetAccountTypeByEmailDto } from './dtos/get-account-type.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
  ) {}

  // TODO: GET USERS BY ACCOUNT TYPE

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getAllUsers(payload: GetAllUsersQueryDto) {
    return await this.usersRepository.getAllUsers(payload);
  }

  async updateUserById(id: string, user: UpdateUserByIdDto) {
    return await this.usersRepository.updateUserById(
      id,
      convertToObjectIdRecursively(user),
    );
  }

  async deleteUserById(id: string) {
    return await this.usersRepository.deleteUserById(id);
  }

  async sendMail({ to, subject, html, cc }: SendMailDto) {
    await this.mailerService.sendMail({ to, subject, html, cc });
  }

  async getAccountTypeByEmail({ email }: GetAccountTypeByEmailDto) {
    return await this.usersRepository.getAccountTypeByEmail(email);
  }
}
