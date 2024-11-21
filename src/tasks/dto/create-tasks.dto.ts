import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The name of the task' })
  task_name: string;
  @ApiProperty({ description: 'The command in task' })
  task_command: string;
  @ApiProperty({ description: 'Date and time for start task' })
  task_due_date: Date;
}
