import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TasksEntity } from '../../tasks/entity/tasks.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@Entity('logs')
export class TaskLogsEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the log' })
  id: number;

  @Column()
  taskId: number;

  @ManyToOne((type) => TasksEntity, (task) => task.logs)
  task: TasksEntity;

  @Column({ default: '' })
  @ApiProperty({ description: '' })
  output: string;

  @Column({ default: '' })
  @ApiProperty({ description: '' })
  error: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '' })
  return_code: string;

  @Column('date')
  run_date: Date;

  @Column({ type: 'date', nullable: true })
  complete_date: Date;

  @PrimaryGeneratedColumn('uuid')
  run_id: number;

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
}
