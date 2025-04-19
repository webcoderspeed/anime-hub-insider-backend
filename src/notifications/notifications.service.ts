import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotificationRepository } from '@app/common';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';
import { Types } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly _notificationRepository: NotificationRepository,
  ) {}

  async getAllNotifications(userId?: string) {
    const filter = userId ? { user: new Types.ObjectId(userId) } : {};
    return this._notificationRepository.find(filter);
  }

  async getNotificationById(id: string) {
    const notification = await this._notificationRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    if (!notification) throw new NotFoundException('Notification not found');
    return notification;
  }

  async createNotification(dto: CreateNotificationDto) {
    return this._notificationRepository.create({
      user: new Types.ObjectId(dto.user),
      message: dto.message,
      type: dto.type,
    });
  }

  async updateNotification(id: string, dto: UpdateNotificationDto) {
    const updated = await this._notificationRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      dto,
    );
    if (!updated) throw new NotFoundException('Notification not found');
    return updated;
  }

  async deleteNotification(id: string) {
    const deleted = await this._notificationRepository.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (!deleted.deletedCount)
      throw new NotFoundException('Notification not found');
    return { deleted: true };
  }
}
