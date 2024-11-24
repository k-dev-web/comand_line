import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TasksEntity, taskState } from './entity/tasks.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ChildProcess, spawn } from 'child_process';
import { TaskLogsService } from '../task-logs/task-logs.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TasksEntity)
    private tasksRepository: Repository<TasksEntity>,
    @Inject() private readonly taskLogsService: TaskLogsService,
  ) {}

  create(createTasksDto: CreateTaskDto): Promise<TasksEntity> {
    const tasks = this.tasksRepository.create(createTasksDto);
    return this.tasksRepository.save(tasks);
  }

  findAll(): Promise<TasksEntity[]> {
    return this.tasksRepository.find({ relations: ['logs'] });
  }

  async findOne(id: number): Promise<TasksEntity> {
    const tasks = await this.tasksRepository.findOneBy({ id: id });
    if (!tasks) {
      throw new NotFoundException('Tasks not found');
    }
    return tasks;
  }

  async remove(id: number): Promise<void> {
    const tasks = await this.findOne(id);
    await this.tasksRepository.remove(tasks);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    const tasksForRun = await this.tasksRepository.find({
      where: {
        task_state: taskState.WAITING,
        task_due_date: LessThanOrEqual(new Date()),
      },
    });

    tasksForRun.forEach(async (task) => {
      this.tasksRepository.update(task.id, { task_state: taskState.RUNNING });
      const log = await this.taskLogsService.create({
        taskId: task.id,
        run_date: new Date(),
      });
      let error = '';
      let output = '';
      const process: ChildProcess = spawn(task.task_command, {
        shell: true,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      process.stdout.on('data', (data) => {
        output += data.toString() + '\n';
      });

      process.stderr.on('data', (data) => {
        error += data.toString() + '\n';
      });
      process.on('close', async (code) => {
        this.taskLogsService.update(log.id, {
          output: output,
          error: error,
          return_code: code.toString(),
          complete_date: new Date(),
        });
        this.tasksRepository.update(task.id, {
          task_state: taskState.COMPLETED,
        });
      });
    });
  }
}
