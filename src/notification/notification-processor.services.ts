import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
@Processor('notifications')
export class NotificationConsumer extends WorkerHost {
    constructor(private prisma: PrismaService) {
        super()
    }
  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'send_notification': {
        console.log(`Processing job ${job.id}...`, job.data);
        try {
          await new Promise((resolve) => setTimeout(resolve, 15000)); 
          console.log(`Sending ${job.data.deliveryType} to user ${job.data.userId}: ${job.data.message}`);

          await this.prisma.notification.create({
            data:{
                userId: job.data.userId,
                message: job.data.message,
                deliveryType: job.data.deliveryType,
                status: 'Delivered'
            }
          });
    
          return { status: 'success' };
        } catch (error) {
          console.error('Notification failed', error);
          await this.prisma.notification.create({
            data:{
                userId: job.data.userId,
                message: job.data.message,
                deliveryType: job.data.deliveryType,
                status: 'Failed'
            }
          });
          throw new Error('Notification failed');
        }
      }
      default: return
    }
  }
}