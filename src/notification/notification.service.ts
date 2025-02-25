import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CreateNotificationDto } from './create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification } from '@prisma/client';

@Injectable()
export class NotficationService {
  constructor(
    @InjectQueue('notifications') private notificationQueue: Queue,
    private prisma: PrismaService
  ) {}

  async sendNotification(createNotificationDTO: CreateNotificationDto): Promise<{jobId: string | null}> {
    const {user_id, delivery_type, message} = createNotificationDTO
    const job = await this.notificationQueue.add("send_notification", {
      userId: user_id,
      message,
      deliveryType: delivery_type
    }, {
        attempts: 3,
        backoff: 5500,
    });

    return {
      jobId: job.id ?? null
    };
  }


  async getNotificationStatus(jobId: string) {
    const job = await this.notificationQueue.getJob(jobId);
    if (!job) return { status: 'Not Found' };
  
    const state = await job.getState();

    const statusMapping = {
      waiting: "Pending",
      active: "Processing",
      completed: "Delivered",
      failed: "Failed",
    };
    return { status: statusMapping[state] ?? "Unknown" };
  }


  async getUserNotifications(userId: string): Promise<Notification[]>{
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId: userId, 
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,  
    });


    return notifications
  }

  
}
