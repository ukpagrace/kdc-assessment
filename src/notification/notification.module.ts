import { Module } from '@nestjs/common';
import {  NotficationController } from './notfication.controller';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotficationService } from './notification.service';
import { NotificationConsumer } from './notification-processor.services';

@Module({
  imports: [
    PrismaModule, 
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [NotficationController],
  providers: [
    NotficationService,
    NotificationConsumer,
    PrismaService
  ],
})
export class NotificationModule {}
