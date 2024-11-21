import { TaskController } from './tasks.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entity/tasks.entity';
import { TaskService } from './tasks.service';
import { TaskLogsModule } from '../task-logs/task-logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity]), TaskLogsModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TasksModule {}
