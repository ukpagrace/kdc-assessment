import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],  // Make PrismaService available
  exports: [PrismaService],    // Export it for other modules
})
export class PrismaModule {}