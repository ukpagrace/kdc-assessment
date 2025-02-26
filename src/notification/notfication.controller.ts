import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotficationService } from './notification.service';
import { CreateNotificationDto } from './create-notification.dto';
import { Notification } from '@prisma/client';

@Controller("notifications")
export class NotficationController {
  constructor(private readonly notificationService: NotficationService) {}


  @Post("send")
  async sendNotification(@Body() createNotification: CreateNotificationDto): Promise<{jobId: string | null}>{
    return await this.notificationService.sendNotification(createNotification);
  }


  @Get("status/:id")
  async getNotification(@Param('id') id: string): Promise<{status: string | null}>{
    return await this.notificationService.getNotificationStatus(id);
  }


  @Get("user/:id")
  async getUserNotifications(@Param('id') id: string): Promise<Notification[]>{
    return await this.notificationService.getUserNotifications(id);
  }

}
