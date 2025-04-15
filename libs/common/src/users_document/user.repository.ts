import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository, IGetAllUsersQueryParams } from '@app/common';
import { User } from './user.schema';
import { USER_POPULATED_FIELDS, USER_SELECTED_FIELDS } from '../constants';
import { getAllUsersQuery } from './mongo_queries';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }

  async getUserByEmail(email: string) {
    return await this.model
      .findOne({ email, isActive: true, isDeleted: false })
      .select(USER_SELECTED_FIELDS)
      .populate(USER_POPULATED_FIELDS)
      .exec();
  }

  async getUserById(id: string) {
    return await this.model
      .findOne({ _id: id })
      .populate(USER_POPULATED_FIELDS)
      .exec();
  }

  async getAllUsers(params: IGetAllUsersQueryParams) {
    const { query, countQuery } = getAllUsersQuery(params);

    const users = await this.model.aggregate(query);
    const count = await this.model.aggregate(countQuery);

    return { users, count: count?.[0]?.count ?? 0 };
  }

  async updateUserById(id: string, payload: Partial<User>) {
    const updatedUser = await this.model.findOneAndUpdate(
      { _id: new ObjectId(id) },
      payload,
      {
        new: true,
      },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }

    return this.getUserById(id);
  }

  async deleteUserById(id: string) {
    const deletedUser = await this.model.findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!deletedUser) {
      throw new NotFoundException(`User not found`);
    }

    return deletedUser;
  }

  async getAccountTypeByEmail(email: string) {
    const user = await this.model.findOne({
      email,
      isActive: true,
      isDeleted: false,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.role;
  }
}
