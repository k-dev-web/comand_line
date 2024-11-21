import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLogsEntity } from './entity/task-logs.entity';
import { TaskLogsService } from './task-logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskLogsEntity])],
  exports: [TaskLogsService],
  providers: [TaskLogsService],
  controllers: [],
})
export class TaskLogsModule {}
