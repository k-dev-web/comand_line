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

export enum logStatus {
  ERROR = 'error',
  SUCCESS = 'successful',
}

@Entity('logs')
export class TaskLogsEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the book' })
  id: number;

  @Column()
  taskId: number;

  @ManyToOne((type) => TasksEntity, (task) => task.id)
  task: TasksEntity;

  @Column({ type: 'enum', enum: logStatus })
  @ApiProperty({ description: 'The price of the book' })
  status: logStatus;

  @Column()
  @ApiProperty({ description: 'The name of the book' })
  output: string;

  @Column()
  @ApiProperty({ description: 'The name of the book' })
  error: string;

  @Column()
  @ApiProperty({ description: 'The name of the book' })
  return_code: string;

  @Column('date')
  run_date: Date;

  @Column('date')
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
