import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskLogsEntity } from '../task-logs/entity/task-logs.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTaskLogsDto } from './dto/create-task-logs.dto';

@Injectable()
export class TaskLogsService {
  constructor(
    @InjectRepository(TaskLogsEntity)
    private logTasksRepository: Repository<TaskLogsEntity>,
  ) {}

  create(createTasksDto: CreateTaskLogsDto): Promise<TaskLogsEntity> {
    const tasks = this.logTasksRepository.create(createTasksDto);
    return this.logTasksRepository.save(tasks);
  }

  async update(id: number, updateTasksDto: any): Promise<UpdateResult> {
    return this.logTasksRepository.update({ id: id }, updateTasksDto);
  }

  findAll(): Promise<TaskLogsEntity[]> {
    return this.logTasksRepository.find();
  }

  async findOne(id: number): Promise<TaskLogsEntity> {
    const tasks = await this.logTasksRepository.findOneBy({ id: id });
    if (!tasks) {
      throw new NotFoundException('Tasks not found');
    }
    return tasks;
  }

  async remove(id: number): Promise<void> {
    const tasks = await this.findOne(id);
    await this.logTasksRepository.remove(tasks);
  }
}
