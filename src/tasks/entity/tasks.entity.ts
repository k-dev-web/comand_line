import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TaskLogsEntity } from '../../task-logs/entity/task-logs.entity';

export enum taskState {
  WAITING = 'waiting_to_run',
  RUNNING = 'running',
  COMPLETED = 'completed',
}

@Entity('tasks')
export class TasksEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the task' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The name of the task' })
  task_name: string;

  @Column()
  @ApiProperty({ description: 'The command in task' })
  task_command: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'Date and time for start task' })
  task_due_date: Date;

  @Column({ type: 'enum', enum: taskState, default: taskState.WAITING })
  @ApiProperty({ description: 'Task status' })
  task_state: taskState;

  @OneToMany((type) => TaskLogsEntity, (log) => log.taskId)
  logs: TaskLogsEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date;
}
