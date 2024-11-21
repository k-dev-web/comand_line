import { TaskController } from './tasks.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entity/tasks.entity';
import { TaskService } from './tasks.service';
import { TaskLogsEntity } from '../task-logs/entity/task-logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, TaskLogsEntity])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TasksModule {}
